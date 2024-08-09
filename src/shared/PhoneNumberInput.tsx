import React, { useState } from 'react';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

  const countryCodes = ['+1', '+44', '+33', '+49'];

  const handleCountryCodeSelect = (code: string) => {
    setSelectedCountryCode(code);
    setShowDropdown(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(`${selectedCountryCode} ${event.target.value}`);
  };

  return (
    <div className="relative max-w-sm mx-auto ">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center  text-gray-900 bg-white border border-gray-300 rounded-l-2xl hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
        >
          {selectedCountryCode}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <input
          type="tel"
          value={value.replace(selectedCountryCode, '').trim()}
          onChange={handleInputChange}
          className="flex-1 py-2.5 px-4 text-sm text-gray-900 bg-white border border-gray-300 rounded-r-2xl focus:ring-4 focus:outline-none focus:ring-gray-100"
          placeholder="Enter phone number"
        />
      </div>
      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white divide-y divide-gray-100 rounded-2xl shadow">
          <ul className="py-2 text-sm text-gray-700">
            {countryCodes.map((code) => (
              <li key={code}>
                <button
                  type="button"
                  onClick={() => handleCountryCodeSelect(code)}
                  className="inline-flex w-full px-4 py-2 text-sm hover:bg-gray-100"
                >
                  {code}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberInput;
