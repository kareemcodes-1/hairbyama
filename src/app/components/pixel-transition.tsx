// components/PixelTransition.tsx
import React from 'react';
import { motion } from 'framer-motion';

const anim = {
  initial: { opacity: 1 },
  exit: (i: number) => ({
    opacity: 0,
    transition: { duration: 0.5, delay: 0.03 * i },
  }),
};

const shuffle = (array: number[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

interface PixelTransitionProps {
  isVisible: boolean;
}

const PixelTransition: React.FC<PixelTransitionProps> = ({ isVisible }) => {
  const getBlocks = () => {
    const { innerHeight } = window;
    const blockSize = window.innerWidth * 0.05; // 5vw
    const nbOfBlocks = Math.ceil(innerHeight / blockSize);
    const indexes = Array.from({ length: nbOfBlocks }, (_, i) => i);
    const shuffledIndexes = shuffle(indexes);

    return shuffledIndexes.map((randomIndex, i) => (
      <motion.div
        key={i}
        className={'w-full h-[5vw] bg-pink-500 flex-shrink-0'}
        variants={anim}
        initial="initial"
        exit="exit"
        custom={randomIndex}
      />
    ));
  };


  return (
    <div className={'fixed top-0 left-0 w-[100vw] h-[100vh] flex pointer-events-none z-[50] overflow-hidden'}>
      {[...Array(20)].map((_, colIndex) => (
        <div key={colIndex} className={'w-[5vw] h-[100%] flex flex-col'}>
          {getBlocks()}
        </div>
      ))}
    </div>
  );
};

export default PixelTransition;