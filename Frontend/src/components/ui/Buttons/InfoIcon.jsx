import React from 'react';
import { RiInformationFill } from 'react-icons/ri';

const InfoIcon = ({
  icon = <RiInformationFill size={20} />,
  className = '',
  info = 'Information',
  position = 'top-8',
  infoClass = 'text-[14px] px-2 py-[3px] rounded dark:bg-white bg-black text-white dark:text-black shadow-md',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center group cursor-pointer relative ${className}`}
    >
      {icon}
      <div
        className={`${position} w-[max-content] absolute hidden group-hover:flex transition-none ${infoClass}`}
      >
        <span>{info}</span>
      </div>
    </div>
  );
};

export default InfoIcon;
