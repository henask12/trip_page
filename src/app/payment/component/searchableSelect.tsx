import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
  icon?: string; // Using class names for flag-icons
}

interface CustomSelectProps {
  options: Option[];
  placeholder?: string;
  searchPlaceholder?: string;
  hasSearch?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search...',
  hasSearch = true,
}) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelectChange = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full py-3 pl-4 pr-9 flex items-center gap-x-2 text-sm text-gray-800 bg-white border border-gray-200 rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:ring-neutral-600"
        aria-expanded={isOpen}
      >
        {selectedOption?.icon && (
          <span className={`fi fi-${selectedOption.icon} w-5 h-5 mr-2`} />
        )}
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg className={`absolute right-3 w-5 h-5 text-gray-500 dark:text-neutral-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full max-h-72 bg-white border border-gray-200 rounded-lg overflow-y-auto z-20 dark:bg-neutral-900 dark:border-neutral-700">
          {hasSearch && (
            <div className="sticky top-0 p-2 bg-white dark:bg-neutral-900">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder={searchPlaceholder}
                className="block w-full px-3 py-2 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
              />
            </div>
          )}
          <ul>
            {filteredOptions.map((option, index) => (
              <li
                key={option.value || index}
                className="py-2 px-4 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                onClick={() => handleSelectChange(option)}
              >
                {option.icon && (
                  <span className={`fi fi-${option.icon} w-5 h-5 mr-2`} />
                )}
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
