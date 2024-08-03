import React, { useState } from "react";
import Image from "next/image";
import { Sheet } from "./sheet";

const tabs = [
  { label: "Tab 1", content: <div className="p-4">Content for Tab 1</div> },
  { label: "Tab 2", content: <div className="p-4">Content for Tab 2</div> },
  { label: "Tab 3", content: <div className="p-4">Content for Tab 3</div> },
];

const FlightDetail: React.FC<{
  data: any;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isSheetOpen: boolean;
  setIsSheetOpen: () => void;
  onCloseSheet: () => void;
}> = ({ data, onSelect, isSelected, isSheetOpen, setIsSheetOpen, onCloseSheet }) => {
  const [isSelectedLocal, setIsSelectedLocal] = useState<boolean>(isSelected);

  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSelectedLocal(!isSelectedLocal);
    onSelect(data.id);
  };

  const handleSheetClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    // setIsSheetOpen(isSheetOpen ? null : data.id);
    setIsSheetOpen();
  };

  return (
    <div
      onClick={handleSheetClick}
      className={`relative cursor-pointer p-4 border rounded-lg shadow-md transition-transform ${isSelectedLocal ? "bg-blue-100 border-blue-500" : "border-neutral-300"}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-24 md:w-20 lg:w-24 flex-shrink-0 md:pt-7">
          <Image
            src={data.airlines.logo}
            className="w-10"
            alt="Airline Logo"
            sizes="40px"
            width={40}
            height={40}
          />
        </div>
        <div className="flex my-5 md:my-0">
          <div className="flex-shrink-0 flex flex-col items-center py-2">
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
            <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          </div>
          <div className="ml-4 space-y-10 text-sm">
            <div className="flex flex-col space-y-1">
              <span className="text-neutral-500 dark:text-neutral-400">Departure: {data.departureTime}</span>
              <span className="font-semibold">Tokyo International Airport (HND)</span>
            </div>
            <div className="flex flex-col space-y-1">
              <span className="text-neutral-500 dark:text-neutral-400">Arrival: {data.arrivalTime}</span>
              <span className="font-semibold">Singapore International Airport (SIN)</span>
            </div>
          </div>
        </div>
        <div className="border-l border-neutral-200 dark:border-neutral-700 md:mx-6 lg:mx-10"></div>
        <ul className="text-sm text-neutral-500 dark:text-neutral-400 space-y-1 md:space-y-2">
          <li>Trip time: {data.duration}</li>
          <li>ANA · Business class · Boeing 787 · NH 847</li>
        </ul>
      </div>
      <button
        onClick={handleSelectClick}
        className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-lg shadow-md hover:bg-blue-600"
      >
        {isSelectedLocal ? "Deselect" : "Select"}
      </button>

      <Sheet
        open={isSheetOpen}
        onClose={onCloseSheet}
        side="right"
        title="Sheet with Tabs"
        tabs={tabs}
      />
    </div>
  );
};

export default FlightDetail;
