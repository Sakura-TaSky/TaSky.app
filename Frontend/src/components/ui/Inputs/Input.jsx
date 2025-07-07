import React from 'react';

const Input = ({
  className = '',
  labelClassName = '',
  label = '',
  type = '',
  value,
  id = '',
  accept = '',
  onChange,
  placeholder = '',
  inputClassName = '',
  required,
  ...rest
}) => {
  return (
    <div className={className}>
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={id}
        accept={accept}
        onChange={onChange}
        placeholder={placeholder}
        className={` outline-0 ${inputClassName}`}
        required={required}
        {...rest}
      />
    </div>
  );
};

export default Input;
