import { CalendarIcon, PencilIcon } from "@heroicons/react/24/outline";
import { TicketIcon, UserIcon } from "@heroicons/react/24/solid";
import React from "react";
import DateTabs, { DateRange } from "@/components/DateTabs";

interface FlightInfoProps {
  departure: string;
  destination: string;
  passengerCount: number;
  cabinClass: string;
  travelDates: string;
  dateRanges: DateRange[];
}

const FlightInfo: React.FC<FlightInfoProps> = ({
  departure,
  destination,
  passengerCount,
  cabinClass,
  travelDates,
  dateRanges
}) => {
  return (
    <div className="container flex justify-between  p-4 bg-white ">
      <div className="flex-1 ">
        <h2 className="text-xl font-semibold">{`${departure} ➔ ${destination}`}</h2>
        <div className="flex items-center space-x-4 mt-2 text-gray-500">
          <div className="flex items-center space-x-1">
            <UserIcon className="h-5 w-5" />
            <span>{`${passengerCount} Adult`}</span>
          </div>
          <div className="flex items-center space-x-1">
            <TicketIcon className="h-5 w-5" />
            <span>{cabinClass}</span>
          </div>
          <div className="flex items-center space-x-1">
            <CalendarIcon className="h-5 w-5" />
            <span>{travelDates}</span>
          </div>{" "}
          <button className=" text-blue-600 flex ">
            <PencilIcon className="h-5 w-5" />
            <span>Edit</span>
          </button>
        </div>
      </div>
      <div className="flex-shrink-0">
        {" "}
        <DateTabs dateRanges={dateRanges} itemsPer={3} />{" "}
      </div>
    </div>
  );
};

export default FlightInfo;
