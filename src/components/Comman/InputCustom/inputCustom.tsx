import React, { forwardRef } from 'react';
import styles from './input.module.scss';

interface InputCustomProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  error?: string;
  success?: string;
  label?: string;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'floating-label' | 'compact';
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const InputCustom = forwardRef<HTMLInputElement, InputCustomProps>(
  (
    {
      type = 'text',
      placeholder,
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
      success,
      label,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      size = 'md',
      variant = 'default',
      icon,
      rightIcon,
    },
    ref
  ) => {
    // Build container classes
    const containerClasses = [
      styles['input-container'],
      styles[`size-${size}`],
      variant !== 'default' && styles[variant],
      icon && styles['has-icon'],
      rightIcon && styles['has-right-icon'],
      className
    ].filter(Boolean).join(' ');

    // Build input classes
    const inputClasses = [
      styles['input-field'],
      error && styles.error,
      success && styles.success
    ].filter(Boolean).join(' ');

    return (
      <div className={containerClasses}>
        {label && variant !== 'floating-label' && (
          <label 
            htmlFor={id || name} 
            className={styles['input-label']}
          >
            {label}
            {required && <span className={styles['required-indicator']}>*</span>}
          </label>
        )}
        
        {icon && <span className={styles['input-icon']}>{icon}</span>}
        
        <input
          ref={ref}
          type={type}
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={inputClasses}
        />
        
        {variant === 'floating-label' && label && (
          <label 
            htmlFor={id || name} 
            className={styles['input-label']}
          >
            {label}
            {required && <span className={styles['required-indicator']}>*</span>}
          </label>
        )}
        
        {rightIcon && <span className={styles['input-icon-right']}>{rightIcon}</span>}
        
        {error && (
          <p className={styles['error-message']}>{error}</p>
        )}
        
        {success && !error && (
          <p className={styles['success-message']}>{success}</p>
        )}
      </div>
    );
  }
);

InputCustom.displayName = 'InputCustom';

export default InputCustom;