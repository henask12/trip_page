"use client";

import React, { FC, useState } from "react";
import {
  FlightCardProps,
  FlightSegment,
  isFlightSegment,
  isMultiCityData,
  isRoundTripData,
} from "../type";
import FlightDetail from "./flight/FlightCardDetails";
import FlightCardHeader from "./flight/FlightCardHeader";

const FlightCard: FC<FlightCardProps> = ({
  className = "",
  data,
  isSheetOpen,
  setIsSheetOpen,
  onCloseSheet,
  tripType,
  onSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    debugger
    setSelectedFlightId(id);
    if (onSelect) {
      onSelect();
    }
  };

  const renderDetail = () => {
    debugger;

    if (!isOpen) return null;

    return (
      <div className="p-1 md:p-8 bg-gray-100 dark:border-neutral-700 rounded-2xl">
        <FlightDetail
          data={data}
          onSelect={handleSelect}
          isSelected={selectedFlightId === "1"}
          isSheetOpen={isSheetOpen}
          setIsSheetOpen={setIsSheetOpen}
          onCloseSheet={onCloseSheet}
        />
      </div>
    );
  };
  const flightSegmentData: FlightSegment = data as FlightSegment;

  return (
    <div
      className={`p-4 sm:p-6 relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl hover:shadow-lg transition-shadow space-y-6 ${className}`}
    >
      <div className={`sm:pr-20 relative ${className}`}>
        <button
          className={`absolute right-0 bottom-0 sm:bottom-auto sm:top-1/2 sm:-translate-y-1/2 w-16 h-9 bg-blue-800 dark:bg-neutral-800 text-white text-md rounded-md flex items-center justify-center cursor-pointer`}
          onClick={() => setIsOpen(!isOpen)}
          // onClick={()=> handleSelect}
        >
          {isOpen ? "Close" : "Select"}
        </button>
        <FlightCardHeader data={flightSegmentData} />
      </div>

      {renderDetail()}
    </div>
  );
};

export default FlightCard;
