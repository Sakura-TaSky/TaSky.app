import React from 'react';
import { PiConfettiFill } from 'react-icons/pi';

const FlatIcon = ({
  className = '',
  icon = <PiConfettiFill size={16} />,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-[max-content] cursor-pointer ${className}`}
    >
      {icon}
    </div>
  );
};

export default FlatIcon;
