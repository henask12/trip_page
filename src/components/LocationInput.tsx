import { ClockIcon, MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC } from "react";
import ClearDataButton from "./ClearDataButton";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
  value?: string;
  onChange?: (location: string) => void;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void; // Add this prop
  fieldName?: string; // Add this prop
}

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
  value = "",
  onChange,
  setFieldValue, // Destructure the new prop
  fieldName, // Destructure the new prop
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState(value);
  const [showPopover, setShowPopover] = useState(autoFocus);

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  useEffect(() => {
    if (onChange) {
      onChange(inputValue);  // Use `inputValue` instead of `selectedLocation`
    }
  }, [inputValue, onChange]);

  useEffect(() => {
    if (setFieldValue && fieldName) {
      setFieldValue(fieldName, inputValue); // Update the form value
    }
  }, [inputValue, setFieldValue, fieldName]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;
      if (!showPopover || containerRef.current.contains(event.target as Node)) {
        return;
      }
      setShowPopover(false);
    };

    if (showPopover) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showPopover]);

  const handleSelectLocation = (item: string) => {
    setInputValue(item);
    setShowPopover(false);
  };

  const renderRecentSearches = () => (
    <>
      <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
        Recent searches
      </h3>
      <div className="mt-2">
        {["Addis Ababa", "Amsterdam", "Shanghai", "Paris", "Rome"].map(
          (item) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className="block font-medium text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
          )
        )}
      </div>
    </>
  );

  const renderSearchValue = () => (
    <>
      {["Addis Ababa", "Amsterdam", "Shanghai", "Paris", "Rome"].map((item) => (
        <span
          onClick={() => handleSelectLocation(item)}
          key={item}
          className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
        >
          <span className="block text-neutral-400">
            <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
          </span>
          <span className="block font-medium text-neutral-700 dark:text-neutral-200">
            {item}
          </span>
        </span>
      ))}
    </>
  );

  return (
    <div className={`relative mt-2 ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative border rounded-lg [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
          showPopover
            ? "border text-sm block w-full p-2.5 dark:placeholder-white dark:text-white"
            : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow">
          <input
            className="block w-full bg-transparent border-none focus:ring-0 p-0 focus:outline-none focus:placeholder-neutral-300 xl:text-lg font-semibold placeholder-neutral-800 dark:placeholder-neutral-200 truncate"
            placeholder={placeHolder}
            value={inputValue}
            autoFocus={showPopover}
            onChange={(e) => setInputValue(e.currentTarget.value)}
            ref={inputRef}
          />
          <span className="block mt-0.5 text-sm text-neutral-400 font-light">
            <span className="line-clamp-1">
              {!!inputValue ? placeHolder : desc}
            </span>
          </span>
          {inputValue && (
            <ClearDataButton onClick={() => setInputValue("")} />
          )}
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-4 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {inputValue ? renderSearchValue() : renderRecentSearches()}
        </div>
      )}
    </div>
  );
};

export default LocationInput;
