"use client";

import React, { FC, useState } from "react";
import { FlightCardProps } from "../type";
import FlightDetail from "./flight/FlightCardDetails";
import FlightCardHeader from "./flight/FlightCardHeader";



const FlightCard: FC<FlightCardProps> = ({ className = "", data, isSheetOpen, setIsSheetOpen, onCloseSheet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedFlightId(id);
  };
  const renderDetail = () => {
    if (!isOpen) return null;
    return (
      <div className="p- md:p-8 border border-neutral-200 dark:border-neutral-700 rounded-2xl">
       
        {<FlightDetail data={data}  onSelect={handleSelect} 
          isSelected={selectedFlightId === data.id} isSheetOpen={isSheetOpen} setIsSheetOpen={setIsSheetOpen} onCloseSheet={onCloseSheet}/>}
        <div className="my-7 md:my-10 space-y-5 md:pl-24">
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
          <div className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
            Transit time: {data.transitTime}
          </div>
          <div className="border-t border-neutral-200 dark:border-neutral-700" />
        </div>
        {/* {<FlightDetail data={data} />} */}
      </div>
    );
  };

  return (
    <div
      className={` p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl  hover:shadow-lg transition-shadow space-y-6 ${className}`}
    >
      <div className={`sm:pr-20 relative ${className}`}>
        <button
          className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-16 h-9 bg-blue-800 dark:bg-neutral-800 text-white text-md rounded-md flex items-center justify-center cursor-pointer `}
          onClick={() => setIsOpen(!isOpen)}
        >
          Select
        </button>

        <FlightCardHeader data={data} />
      </div>

      {renderDetail()}
    </div>
  );
};

export default FlightCard;
