"use client";
import React, { FC, useState } from "react";

import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";

export type SearchTab =
   "Hotels"
  | "Flights"
  | "Trains"
  | "Cars"
  | "Attractions & Tours"
  | "Flight + Hotel";

export interface HeroSearchFormProps {
  className?: string;
  currentTab?: SearchTab;
  currentPage?:  "Hotels"
  | "Flights"
  | "Trains"
  | "Cars"
  | "Attractions & Tours"
  | "Flight + Hotel";
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  currentTab = "Flights",
  currentPage,
}) => {
  const tabs: SearchTab[] = [
    "Hotels",
    "Flights",
    "Trains",
    "Cars",
    "Attractions & Tours",
    "Flight + Hotel",
  ];
  const [tabActive, setTabActive] = useState<SearchTab>(currentTab);

  const renderTab = () => {
    return (
     <div className="transform -translate-y-1/2 flex-wrap bg-custom-blue  h-14 flex flex-col  rounded-3xl shadow-lg px-2 ">
       <ul className="mx-2  flex flex-wrap space-x-5 sm:space-x-8 lg:space-x-11 overflow-x-auto hiddenScrollbar  items-center justify-center ">
        {tabs.map((tab) => {
          const active = tab === tabActive;
          return (
            <li
              onClick={() => setTabActive(tab)}
              className={`flex-shrink-0 flex items-center px-4 py-2 cursor-pointer text-sm lg:text-base font-medium   rounded-full transition-colors ${
                active
                  ? " bg-white text-neutral-800 rounded-full m-2 justify-center"
                  : "text-white"
              } `}
              key={tab}
            >
              
              <span>{tab}</span>
            </li>
          );
        })}
      </ul>
     </div>
    );
  };

  const renderForm = () => {
    switch (tabActive) {
      case "Hotels":
        return <FlightSearchForm />;
      case "Flights":
        return <FlightSearchForm />;
      case "Trains":
        return <FlightSearchForm />;
      case "Cars":
        return <FlightSearchForm />;
      case "Attractions & Tours":
        return <FlightSearchForm />;
      case "Flight + Hotel":
        return <FlightSearchForm />;

      default:
        return null;
    }
  };

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl py-1 lg:py-0  p-2 pr-2 pl-2 flex  
        items-center justify-center flex-wrap bg-white rounded-xl  shadow-2xl border-t-2 ${className}`} 
    >
      {/**-translate-y-1/2  this is removed css class from the div*/} 
      {renderTab()}
      {renderForm()}
      
    </div>
  );
};

export default HeroSearchForm;
