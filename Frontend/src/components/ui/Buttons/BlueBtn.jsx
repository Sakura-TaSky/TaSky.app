import React from 'react';
import Loader from '../Loader/Loader';

const BlueBtn = ({
  className = '',
  text = 'Click',
  textSize = '14px',
  isLoading,
  loaderSize = '16px',
  loaderBorderColor = 'border-zinc-50',
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      type='submit'
      style={{
        fontSize: `${textSize}`,
      }}
      className={`${className} w-[max-content] flex items-center border-zinc-50 gap-2 px-3 py-1.5 bg-blue-500 text-zinc-50 shadow-md rounded 
       transition-all duration-200 ease-out
       ${isLoading ? 'bg-zinc-500 opacity-30 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-600 active:bg-blue-400'}`}
    >
      {isLoading && (
        <Loader size={loaderSize} boardeColor={loaderBorderColor} />
      )}
      {text}
    </button>
  );
};

export default BlueBtn;
