import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CSSCassetteTapeFixed as CSSCassetteTape } from './CSSCassetteTapeFixed'

export function CassetteShelf({ cassettes, onCassetteClick, currentTrack }) {
  const shelfVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };
  return (
    <div className="fixed right-0 top-0 h-full w-64 bg-gray-800/80 backdrop-blur-sm p-4 z-50 shadow-xl">
      <h2 className="text-white text-xl font-bold mb-4">Your Cassettes</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="shelf">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-4 h-[calc(100%-4rem)] overflow-y-auto"
            >
              {cassettes.map((cassette, index) => (
                <Draggable key={cassette.id} draggableId={cassette.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="rounded bg-gray-700/90 p-4 text-white shadow-lg transition-transform hover:scale-105 cursor-grab active:cursor-grabbing"
                      draggable="true"
                      onDragStart={(e) => {
                        e.dataTransfer.setData('text/plain', JSON.stringify(cassette));
                        e.dataTransfer.effectAllowed = 'copy';
                        // Add a dragging class to improve the visual feedback
                        e.target.classList.add('dragging');
                      }}
                      onDragEnd={(e) => {
                        // Remove the dragging class
                        e.target.classList.remove('dragging');
                      }}
                    >
                      <h3 className="text-lg font-bold">{cassette.title}</h3>
                      <p className="text-sm text-gray-300">{cassette.artist}</p>
                      {cassette.preview && (
                        <div className="mt-2 text-xs text-gray-400">
                          ♪ Preview available
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
