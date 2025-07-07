import React from 'react';

const Loader = ({
  size = '16px',
  borderSize = '2px',
  boardeColor = 'border-gray-500',
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-t-transparent bg-transparent ${boardeColor}`}
      style={{
        width: size,
        height: size,
        borderWidth: borderSize,
      }}
    />
  );
};

export default Loader;
