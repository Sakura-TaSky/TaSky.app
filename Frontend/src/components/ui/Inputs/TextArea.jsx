import React from 'react';

const TextArea = ({
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
      <textarea
        type={type}
        value={value}
        id={id}
        accept={accept}
        onChange={onChange}
        placeholder={placeholder}
        className={` min-h-10 max-h-28 outline-0 ${inputClassName}`}
        required={required}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
