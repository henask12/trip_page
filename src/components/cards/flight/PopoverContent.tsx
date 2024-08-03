import React from "react";
import Image from "next/image";
import { WifiIcon, BoltIcon, GlobeAltIcon, FilmIcon } from "@heroicons/react/24/outline";
import { Popover } from "@headlessui/react";

const PopoverContent: React.FC<{ logo: string, name: string, flightNumber: string, amenities?: any, co2Emissions?: string, flightClass?: string }> = ({ logo, name, flightNumber, amenities, co2Emissions, flightClass }) => {
  return (
    <Popover className="absolute flex items-center top-12 z-10 text-black text-xs rounded-lg">
      <div className="absolute z-10 w-screen max-w-xs sm:max-w-sm px-4 mt-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div className="relative flex items-center px-3 py-2 space-x-2">
          <Image
            src={logo}
            width={8}
            height={8}
            alt="air-logo"
            sizes="30px"
            className="w-6 h-6"
          />
          <div className="text-gray-900 dark:text-gray-100">
            {name} {flightNumber}
          </div>
        </div>
        {co2Emissions && (
          <div className="relative flex items-center px-3 py-2 space-x-2">
            {co2Emissions}
          </div>
        )}
        <div className="relative flex items-center px-3 py-2 space-x-2">
          {flightClass ?? "Economy Class"}
        </div>
        {amenities?.wifi && (
          <div className="relative flex items-center px-3 py-2 space-x-2 text-gray-900 dark:text-gray-100">
            <WifiIcon className="h-4 w-4 text-teal-500 hover:text-blue-500 transition-colors" />
            <span className="ml-2">Wi-Fi (additional charge)</span>
          </div>
        )}
        {amenities?.usb && (
          <div className="relative flex items-center px-3 py-2 space-x-2 text-gray-900 dark:text-gray-100">
            <BoltIcon className="h-4 w-4 text-teal-500 hover:text-blue-500 transition-colors" />
            <span className="ml-2">USB Charging Ports</span>
          </div>
        )}
        {amenities?.meals && (
          <div className="relative flex items-center px-3 py-2 space-x-2 text-gray-900 dark:text-gray-100">
            <GlobeAltIcon className="h-4 w-4 text-teal-500 hover:text-blue-500 transition-colors" />
            <span className="ml-2">Complimentary Meals</span>
          </div>
        )}
        {amenities?.entertainment && (
          <div className="relative flex items-center px-3 py-2 space-x-2 text-gray-900 dark:text-gray-100">
            <FilmIcon className="h-4 w-4 text-teal-500 hover:text-blue-500 transition-colors" />
            <span className="ml-2">In-Flight Entertainment</span>
          </div>
        )}
      </div>
    </Popover>
  );
};

export default PopoverContent;
