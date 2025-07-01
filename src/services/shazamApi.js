import axios from 'axios';

const shazamApi = axios.create({
  baseURL: 'https://shazam.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
  }
});

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
