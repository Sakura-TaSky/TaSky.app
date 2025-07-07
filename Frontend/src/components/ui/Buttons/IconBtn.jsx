import { Loader } from 'lucide-react';
import React from 'react';
import { RiInformationFill } from 'react-icons/ri';

const IconBtn = ({
  text = 'Information',
  icon = <RiInformationFill size={18} />,
  gap = '12px',
  className = '',
  onClick,
  isLoading,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        gap: `${gap}`,
      }}
      disabled={isLoading}
      className={`${isLoading ? 'opacity-40 cursor-not-allowed' : ''} cursor-pointer flex items-center ${className}`}
    >
      {isLoading && <Loader className='animate-spin' />}
      {icon}
      {text}
    </button>
  );
};

export default IconBtn;
