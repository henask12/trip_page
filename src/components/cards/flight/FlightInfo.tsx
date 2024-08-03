// components/FlightInfo.tsx
import { CalendarIcon, PencilIcon } from '@heroicons/react/24/outline';
import { TicketIcon, UserIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface FlightInfoProps {
  departure: string;
  destination: string;
  passengerCount: number;
  cabinClass: string;
  travelDates: string;
}

const FlightInfo: React.FC<FlightInfoProps> = ({
  departure,
  destination,
  passengerCount,
  cabinClass,
  travelDates,
}) => {
  return (
    <div className="flex items-center space-x-4 p-4 bg-white shadow-md rounded-md">
      <div>
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
          </div>
        </div>
      </div>
      <button className="ml-auto text-blue-600 flex items-center space-x-1">
        <PencilIcon className="h-5 w-5" />
        <span>Edit</span>
      </button>
    </div>
  );
};

export default FlightInfo;
