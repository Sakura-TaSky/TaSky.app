import { useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import { TbMoonFilled } from 'react-icons/tb';
import { useTheme } from '../global';

const ThemeToggle = () => {
  const { lightTheme, darkTheme, theme } = useTheme();
  const [switching, setSwitching] = useState(false);

  const handleToggle = () => {
    setSwitching(true);
    theme === 'light' ? darkTheme() : lightTheme();
    setTimeout(() => {
      setSwitching(false);
    }, 100);
  };

  return (
    <div onClick={handleToggle} className='fixed top-2 right-2 z-50'>
      <button
        className={`cursor-pointer rounded-md h-8 w-8 shadow-md flex items-center justify-center transition-all duration-300 ease-in ${theme === 'light' ? 'bg-zinc-800 text-zinc-200' : 'bg-zinc-200 text-zinc-800'}`}
      >
        <span className='relative h-6 w-6 overflow-hidden'>
          <span
            key={theme}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
              switching
                ? 'opacity-0 -translate-y-3'
                : 'opacity-100 translate-y-0'
            }`}
          >
            {theme === 'light' ? (
              <IoSunny size={18} />
            ) : (
              <TbMoonFilled size={18} />
            )}
          </span>
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
