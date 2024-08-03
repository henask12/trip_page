import React, { useState } from "react";

interface Tab {
  title: string;
  content: React.ReactNode;
}

interface SideSheetProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

const SideSheet: React.FC<SideSheetProps> = ({ isOpen, onClose, data }) => {
  const [activeTab, setActiveTab] = useState<string>("Details");

  const tabs: Tab[] = [
    {
      title: "Details",
      content: (
        <div>
          <p><strong>Departure:</strong> {data.departureTime}</p>
          <p><strong>Arrival:</strong> {data.arrivalTime}</p>
          <p><strong>Duration:</strong> {data.duration}</p>
          <p><strong>Flight Number:</strong> {data.flightNumber}</p>
          <p><strong>Airline:</strong> {data.airlines.name}</p>
        </div>
      ),
    },
    {
      title: "Booking Info",
      content: (
        <div>
          <p><strong>Price:</strong> ${data.price}</p>
          <p><strong>Booking Date:</strong> {data.bookingDate}</p>
          <p><strong>Seat:</strong> {data.seat}</p>
        </div>
      ),
    },
    {
      title: "Amenities",
      content: (
        <div>
          <p><strong>WiFi:</strong> {data.amenities.wifi ? "Available" : "Not Available"}</p>
          <p><strong>Food:</strong> {data.amenities.food}</p>
          <p><strong>Entertainment:</strong> {data.amenities.entertainment}</p>
        </div>
      ),
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-80 p-4 z-50`}
      style={{ transition: 'transform 0.3s ease-in-out' }} onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
        X
      </button>
      <h2 className="text-lg font-bold">Flight Details</h2>
      
      <div className="border-b border-gray-300">
        <div className="flex">
          {tabs.map((tab) => (
            <div
              key={tab.title}
              className={`flex-1 text-center py-2 cursor-pointer ${activeTab === tab.title ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-600'}`}
              onClick={() => setActiveTab(tab.title)}
            >
              {tab.title}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {tabs.find((tab) => tab.title === activeTab)?.content}
      </div>
    </div>
  );
};

export default SideSheet;
