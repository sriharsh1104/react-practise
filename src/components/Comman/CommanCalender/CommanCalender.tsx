import React, { useState } from 'react';
import Calendar from 'react-calendar';
import type { CalendarProps as ReactCalendarProps } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Extended interface for our custom calendar component
interface CommanCalendarProps extends Omit<ReactCalendarProps, 'onChange'> {
  value?: ReactCalendarProps['value'];
  onChange?: (value: ReactCalendarProps['value']) => void;
  disabled?: boolean;
  className?: string;
  onCalendarClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onDateChange?: (date: Date) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  required?: boolean;
  id?: string;
  name?: string;
}

const CommanCalender: React.FC<CommanCalendarProps> = ({
  value: externalValue,
  onChange: externalOnChange,
  disabled = false,
  className = '',
  onCalendarClick,
  onDateChange,
  placeholder = 'Select date',
  label,
  error,
  required = false,
  id,
  name,
  ...restProps
}) => {
  // Internal state for uncontrolled component
  const [internalValue, setInternalValue] = useState<ReactCalendarProps['value']>(
    externalValue || new Date()
  );

  // Use external value if provided, otherwise use internal state
  const currentValue = externalValue !== undefined ? externalValue : internalValue;

  // Handle date changes
  const handleDateChange = (newValue: ReactCalendarProps['value']) => {
    if (disabled) return;

    // Update internal state if not controlled
    if (externalValue === undefined) {
      setInternalValue(newValue);
    }

    // Call external onChange if provided
    if (externalOnChange) {
      externalOnChange(newValue);
    }

    // Call onDateChange if provided and it's a single date
    if (onDateChange && newValue instanceof Date) {
      onDateChange(newValue);
    }
  };

  // Handle calendar click
  const handleCalendarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onCalendarClick) {
      onCalendarClick(event);
    }
  };

  return (
    <div className={`comman-calendar-wrapper ${className}`}>
      {label && (
        <label htmlFor={id} className="calendar-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      
      <div 
        className={`comman-calendar ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
        onClick={handleCalendarClick}
      >
        <Calendar
          value={currentValue}
          onChange={handleDateChange}
          {...restProps}
        />
      </div>
      
      {error && (
        <div className="calendar-error">
          {error}
        </div>
      )}
    </div>
  );
};

export default CommanCalender;