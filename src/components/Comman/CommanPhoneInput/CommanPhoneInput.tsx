import React, { forwardRef } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

interface CommanPhoneInputProps {
  value?: string;
  onChange?: (value: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  label?: string;
  placeholder?: string;
  defaultCountry?: any;
  international?: boolean;
  withCountryCallingCode?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
}

const CommanPhoneInput = forwardRef<HTMLInputElement, CommanPhoneInputProps>(
  (
    {
      value,
      onChange,
      onBlur,
      onFocus,
      name,
      id,
      disabled = false,
      required = false,
      className = '',
      error,
      label,
      placeholder = 'Enter phone number',
      defaultCountry = 'IN',
      international = true,
      withCountryCallingCode = true,
      autoComplete = 'tel',
      maxLength,
      minLength,
    },
    ref
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={id || name} 
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <PhoneInput
            international={international}
            defaultCountry={defaultCountry}
            withCountryCallingCode={withCountryCallingCode}
            value={value}
            onChange={onChange || (() => {})}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            autoComplete={autoComplete}
            maxLength={maxLength}
            minLength={minLength}
            className={`
              w-full px-3 py-2 border rounded-md shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-100 disabled:cursor-not-allowed
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
              ${className}
            `.trim()}
          />
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

CommanPhoneInput.displayName = 'CommanPhoneInput';

export default CommanPhoneInput;
