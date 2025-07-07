import React from 'react';
import { Loader, LoaderCircle, LoaderPinwheel } from 'lucide-react';
import { TbLoader3 } from 'react-icons/tb';

const loaderMap = {
  1: LoaderCircle,
  2: Loader,
  3: TbLoader3,
  4: LoaderPinwheel,
};

const Btn = ({
  text = 'Done',
  className = 'px-4 py-2 bg-zinc-500/5 hover:bg-blue-500/20 text-sm rounded-lg hover:text-blue-500',
  gap = '10px',
  isloading,
  selectLoader = 1,
  loaderSize = 'size-4.5',
  onClick,
  type = '',
  icon,
}) => {
  const SelectedLoader = loaderMap[selectLoader] || loaderMap[1];

  return (
    <button
      type={type}
      disabled={isloading}
      onClick={onClick}
      style={{
        gap: `${gap}`,
      }}
      className={`${isloading ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} w-[max-content] flex items-center ${className}`}
    >
      {isloading && <SelectedLoader className={`animate-spin ${loaderSize}`} />}
      {icon}
      {text}
    </button>
  );
};

export default Btn;
