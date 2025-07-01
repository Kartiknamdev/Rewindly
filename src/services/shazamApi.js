import axios from 'axios';

const shazamApi = axios.create({
  baseURL: 'https://shazam.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
});

// Demo tracks for fallback
const demoTracks = [
  {
    id: '1',
    title: 'Flowers',
    artist: 'Miley Cyrus',
    albumArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music123/v4/9e/80/c7/9e80c757-6994-4338-9e79-b0f5611b1b0a/196589564437.jpg/400x400bb.jpg',
  },
  {
    id: '2',
    title: 'Anti-Hero',
    artist: 'Taylor Swift',
    albumArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/8f/84/d9/8f84d9e9-e9af-9b45-3a68-0b527c507e41/22UM1IM24801.rgb.jpg/400x400bb.jpg',
  },
  {
    id: '3',
    title: 'Unholy',
    artist: 'Sam Smith & Kim Petras',
    albumArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/a7/46/2f/a7462f44-24f6-4875-0a8b-986150ca63b5/196589564694.jpg/400x400bb.jpg',
  },
  {
    id: '4',
    title: 'As It Was',
    artist: 'Harry Styles',
    albumArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/2a/19/fb/2a19fb85-2f70-9e44-f2a9-82abe679b88e/886449990061.jpg/400x400bb.jpg',
  },
  {
    id: '5',
    title: 'Rich Flex',
    artist: 'Drake & 21 Savage',
    albumArt: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/40/3f/67/403f67e8-d485-883e-882f-37b9cc609d19/22UM1IM11914.rgb.jpg/400x400bb.jpg',
  }
];

export const getTrendingTracks = async () => {
  try {
    if (!import.meta.env.VITE_RAPID_API_KEY) {
      console.log('No API key found, using demo tracks');
      return demoTracks;
    }

    // Using the world charts endpoint for trending tracks
    const response = await shazamApi.get('/charts/list');
    const worldChartId = response.data.find(chart => chart.name === "World")?.id;
    
    if (!worldChartId) {
      console.log('No world chart found, using demo tracks');
      return demoTracks;
    }

    const tracksResponse = await shazamApi.get('/charts/track', {
      params: {
        locale: 'en-US',
        listId: worldChartId,
        pageSize: '10',
        startFrom: '0'
      }
    });

    if (!tracksResponse.data.tracks || tracksResponse.data.tracks.length === 0) {
      console.log('No tracks found in API response, using demo tracks');
      return demoTracks;
    }

    return tracksResponse.data.tracks.map(track => ({
      id: track.key,
      title: track.title,
      artist: track.subtitle,
      albumArt: track.images?.coverart,
      preview: track.hub?.actions?.[1]?.uri || track.hub?.options?.[0]?.actions?.[1]?.uri,
      artistId: track.artists?.[0]?.adamid
    }));

  } catch (error) {
    console.error('Error fetching trending tracks:', error);
    return demoTracks;
  }
};

export const searchTracks = async (query) => {
  try {
    const response = await shazamApi.get('/search', {
      params: { 
        term: query,
        locale: 'en-US',
        offset: '0',
        limit: '10'
      }
    });

    if (response.data.tracks) {
      return response.data.tracks.hits.map(hit => ({
        id: hit.track.key,
        title: hit.track.title,
        artist: hit.track.subtitle,
        albumArt: hit.track.images?.coverart,
        preview: hit.track.hub?.actions?.[1]?.uri || hit.track.hub?.options?.[0]?.actions?.[1]?.uri,
        artistId: hit.track.artists?.[0]?.adamid
      }));
    }
    return [];
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
};

export const getTrackDetails = async (trackId) => {
  try {
    const response = await shazamApi.get('/songs/get-details', {
      params: { 
        key: trackId,
        locale: 'en-US'
      }
    });
    
    return {
      id: response.data.key,
      title: response.data.title,
      artist: response.data.subtitle,
      albumArt: response.data.images?.coverart,
      preview: response.data.hub?.actions?.[1]?.uri || response.data.hub?.options?.[0]?.actions?.[1]?.uri,
      lyrics: response.data.sections?.find(section => section.type === 'LYRICS')?.text,
      genres: response.data.genres,
      releaseYear: response.data.sections?.find(section => section.metadata)?.metadata?.find(meta => meta.title === 'Released')?.text
    };
  } catch (error) {
    console.error('Error getting track details:', error);
    throw error;
  }
};

export const getArtistTopTracks = async (artistId) => {
  try {
    const response = await shazamApi.get('/artists/get-top-songs', {
      params: {
        id: artistId,
        l: 'en-US'
      }
    });

    return response.data.tracks.map(track => ({
      id: track.key,
      title: track.title,
      artist: track.subtitle,
      albumArt: track.images?.coverart,
      preview: track.hub?.actions?.[1]?.uri || track.hub?.options?.[0]?.actions?.[1]?.uri
    }));
  } catch (error) {
    console.error('Error getting artist top tracks:', error);
    throw error;
  }
};

export const getLatestRelease = async (artistId) => {
  try {
    const response = await shazamApi.get('/artists/get-latest-release', {
      params: {
        id: artistId,
        l: 'en-US'
      }
    });

    return {
      id: response.data.key,
      title: response.data.title,
      artist: response.data.subtitle,
      albumArt: response.data.images?.coverart,
      preview: response.data.hub?.actions?.[1]?.uri || response.data.hub?.options?.[0]?.actions?.[1]?.uri,
      releaseDate: response.data.releasedate
    };
  } catch (error) {
    console.error('Error getting latest release:', error);
    throw error;
  }
};
