import React, { forwardRef } from 'react';

const FileInput = forwardRef(
  (
    {
      className = '',
      labelClassName = '',
      label = '',
      value,
      id = '',
      accept = '',
      onChange,
      divClassName = '',
      required,
      label2,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={divClassName}>
        <label className={labelClassName} htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          type='file'
          value={value}
          id={id}
          accept={accept}
          onChange={onChange}
          className={`hidden`}
          required={required}
          {...rest}
        />
        <label className={className} htmlFor={id}>
          {label2}
        </label>
      </div>
    );
  }
);

export default FileInput;
