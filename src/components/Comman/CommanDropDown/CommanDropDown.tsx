import React, { useState, useRef, useEffect } from 'react';

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface CommanDropDownProps {
  options: DropdownOption[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'filled';
  fullWidth?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
  maxHeight?: string;
  className?: string;
  onBlur?: () => void;
  onFocus?: () => void;
}

const CommanDropDown: React.FC<CommanDropDownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  label,
  error,
  disabled = false,
  required = false,
  size = 'md',
  variant = 'default',
  fullWidth = false,
  searchable = false,
  multiSelect = false,
  maxHeight = '200px',
  className = '',
  onBlur,
  onFocus,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    multiSelect && value ? (Array.isArray(value) ? value : [value]) : []
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle single select value
  const selectedValue = multiSelect ? undefined : value;
  const selectedOption = options.find(option => option.value === selectedValue);

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          setSearchTerm('');
          break;
        case 'Enter':
          event.preventDefault();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleOptionClick = (option: DropdownOption) => {
    if (option.disabled) return;

    if (multiSelect) {
      const newSelectedValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value];
      
      setSelectedValues(newSelectedValues);
      onChange?.(newSelectedValues as any);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      onFocus?.();
    } else {
      onBlur?.();
    }
  };

  const getDisplayText = () => {
    if (multiSelect) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const option = options.find(opt => opt.value === selectedValues[0]);
        return option?.label || placeholder;
      }
      return `${selectedValues.length} items selected`;
    }
    return selectedOption?.label || placeholder;
  };

  const baseClasses = 'relative border rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    default: 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500',
    outline: 'border-gray-300 bg-white text-gray-900 focus:ring-blue-500 focus:border-blue-500',
    filled: 'border-gray-300 bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer hover:bg-gray-50';
  const errorClass = error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : '';

  const dropdownClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${errorClass} ${className}`.trim();

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div ref={dropdownRef} className="relative">
        <div
          className={dropdownClasses}
          onClick={handleToggle}
          tabIndex={disabled ? -1 : 0}
        >
          <div className="flex items-center justify-between">
            <span className={`${selectedOption || selectedValues.length > 0 ? 'text-gray-900' : 'text-gray-500'}`}>
              {getDisplayText()}
            </span>
            {isOpen ? (
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : (
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
            {searchable && (
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  autoFocus
                />
              </div>
            )}
            
            <div 
              className="overflow-y-auto"
              style={{ maxHeight }}
            >
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2 text-sm text-gray-500">
                  No options available
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = multiSelect 
                    ? selectedValues.includes(option.value)
                    : option.value === selectedValue;
                  
                  return (
                    <div
                      key={option.value}
                      className={`
                        px-3 py-2 text-sm cursor-pointer transition-colors duration-150
                        ${isSelected ? 'bg-blue-50 text-blue-900' : 'text-gray-900 hover:bg-gray-50'}
                        ${option.disabled ? 'opacity-50 cursor-not-allowed hover:bg-transparent' : ''}
                      `}
                      onClick={() => handleOptionClick(option)}
                    >
                      <div className="flex items-center">
                        {multiSelect && (
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        )}
                        {option.icon && <span className="mr-2">{option.icon}</span>}
                        <span>{option.label}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CommanDropDown;
