import React from 'react';

const animationsMap = {
  1: 'animate-bounce',
  2: 'animate-ping ',
};

const DotLoader = ({
  selectAnimation = 1,
  oneDotColor = 'bg-red-500',
  twoDotColor = 'bg-yellow-500',
  threeDotColor = 'bg-blue-500',
  fourDotColor = 'bg-green-500',
  size = 'h-3 w-3',
  gap = '5px',
}) => {
  const selectedAnimation = animationsMap[selectAnimation] || 'animate-bounce';

  return (
    <>
      <div
        style={{
          gap: `${gap}`,
        }}
        className={`flex items-center`}
      >
        <span
          className={`rounded-full ${size} ${oneDotColor} ${selectedAnimation} [animation-delay:-0.5s]`}
        ></span>
        <span
          className={`rounded-full ${size} ${twoDotColor} ${selectedAnimation} [animation-delay:-0.4s]`}
        ></span>
        <span
          className={`rounded-full ${size} ${threeDotColor} ${selectedAnimation} [animation-delay:-0.3s]`}
        ></span>
        <span
          className={`rounded-full ${size} ${fourDotColor} ${selectedAnimation} [animation-delay:-0.25s]`}
        ></span>
      </div>
    </>
  );
};

export default DotLoader;
