const Logo = ({ className = '' }) => {
  return (
    <div>
      <span className={`${className} font-semibold`}>DoFlow</span>
      <span className='text-sm text-zinc-500 font-medium'>.app</span>
    </div>
  );
};

export default Logo;
