import React from 'react';

const AvatarGroup = (
  { users = [], maxVisible = 5, className = '', size = 'md', tooltip = true },
  groupKey,
  onClick
) => {
  const visibleUsers = users.slice(0, maxVisible);
  const extraCount = users.length - maxVisible;

  const sizeClasses = {
    xs: 'w-5 h-5',
    sm: 'w-6.5 h-6.5',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const avatarSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div
      onClick={onClick}
      className={`${className} flex items-center -space-x-2.5`}
    >
      {visibleUsers.map(user => (
        <div
          key={`${groupKey}-${user?._id}`}
          className='relative group hover:z-20'
        >
          {/* Avatar */}
          <div
            className={`${avatarSize} rounded-full border-2 border-white shadow-sm overflow-hidden hover:scale-105 smooth`}
          >
            <img
              src={user?.profilePhoto}
              alt={user?.userName}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Tooltip */}
          {tooltip && (
            <div className='shadow-md absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-zinc-900 text-zinc-200 dark:font-medium dark:bg-zinc-50 dark:text-zinc-800 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap'>
              {user?.userName}
            </div>
          )}
        </div>
      ))}

      {extraCount > 0 && (
        <div className='relative group'>
          <div
            className={`${avatarSize} rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium text-gray-700 shadow-sm`}
          >
            +{extraCount}
          </div>
          <div className='absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10'>
            +{extraCount} more
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
