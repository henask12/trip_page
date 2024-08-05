"use client";

import { FC, useCallback, useEffect } from "react";
import FlightSearchForm from "../flight-search-form/FlightSearchForm";
import DateTabs from "@/components/DateTabs";
import React, { useState } from "react";
import FlightCard from "@/components/cards/FlightCard";
import Categories from "@/components/cards/flight/catagories";
import { FlightCardProps } from "@/components/type";
import FlightFilter from "@/components/cards/flight/FlightFilter";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import FlightInfo from "@/components/cards/flight/FlightInfo";
import useScrollHandler from "@/utils/useScroll";
import { setFlightSearchState } from "@/features/flightSearch/flightSearchSlice";
import { roundTripBusiness } from "@/data/searchData";

const dateRanges = [
  { range: "Aug 06 – Aug 20", price: "View" },
  { range: "Aug 07 – Aug 21", price: "View" },
  { range: "Aug 08 – Aug 22", price: "$143" },
  { range: "Aug 09 – Aug 23", price: "$143" },
  { range: "Aug 10 – Aug 24", price: "View" },
  { range: "Aug 11 – Aug 25", price: "$125" },
  { range: "Aug 12 – Aug 26", price: "View" },
  { range: "Sep 06 – Sep 20", price: "View" },
  { range: "Sep 07 – Sep 21", price: "View" },
  { range: "Sep 08 – Sep 22", price: "$143" },
  { range: "Sep 09 – Sep 23", price: "$143" },
  { range: "Sep 10 – Sep 24", price: "View" },
  { range: "Sep 11 – Sep 25", price: "$125" },
  { range: "Sep 12 – Sep 26", price: "View" },
];
const DEMO_DATA: FlightCardProps["data"][] = [
  {
    id: "1",
    price: "$4,100",
    departureTime: "10:00",
    stops: "1 Stop",
    arrivalTime: "20:00",
    transitTime: "04:00",
    duration: "06:00",
    flightNumber: "KE0654",
    origin: "ADD (Addis Ababa Airport)",
    destination: "DXB (Dubai International Airport)",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
      name: "Korean Air",
    },
    amenities: {
      wifi: true,
      usb: true,
      meals: true,
      entertainment: true,
    },
  },
  {
    id: "2",
    price: "$3,380",
    departureTime: "10:00",
    stops: "1 Stop",
    arrivalTime: "20:00",
    origin: "ADD (Addis Ababa Airport)",
    destination: "DXB (Dubai International Airport)",
    duration: "06:00",
    transitTime: "04:00",
    flightNumber: "KE0654",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
      name: "Singapore Airlines",
    },
    amenities: {
      wifi: true,
      usb: true,
      meals: true,
      entertainment: true,
    },
  },
  {
    id: "3",
    price: "$2,380",
    departureTime: "10:00",
    flightNumber: "KE0654",
    origin: "ADD (Addis Ababa Airport)",
    destination: "DXB (Dubai International Airport)",
    duration: "06:00",
    stops: "1 Stop",
    arrivalTime: "20:00",
    transitTime: "04:00",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/multi.png",
      name: "Philippine Airlines",
    },
    amenities: {
      wifi: true,
      usb: true,
      meals: true,
      entertainment: true,
    },
  },
  {
    id: "1",
    price: "$4,100",
    departureTime: "10:00",
    flightNumber: "KE0654",
    duration: "06:00",
    transitTime: "04:00",
    stops: "1 Stop",
    arrivalTime: "20:00",
    origin: "ADD (Addis Ababa Airport)",
    destination: "DXB (Dubai International Airport)",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
      name: "Korean Air",
    },
    amenities: {
      wifi: true,
      usb: true,
      meals: true,
      entertainment: true,
    },
  },
  {
    id: "2",
    price: "$3,380",
    departureTime: "10:00",
    flightNumber: "KE0654",
    duration: "06:00",
    transitTime: "04:00",
    stops: "1 Stop",
    arrivalTime: "20:00",
    origin: "ADD (Addis Ababa Airport)",
    destination: "DXB (Dubai International Airport)",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
      name: "Singapore Airlines",
    },
    amenities: {
      wifi: true,
      usb: true,
      meals: true,
      entertainment: true,
    },
  },
  {
    id: "1",
    price: "$4,100",
    departureTime: "10:00",
    flightNumber: "KE0654",
    duration: "06:00",
    transitTime: "04:00",
    origin: "ADD (Addis Ababa Airport)",
    destination: "DXB (Dubai International Airport)",
    stops: "1 Stop",
    arrivalTime: "20:00",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/KE.png",
      name: "Korean Air",
    },
    amenities: {
      wifi: true,
      usb: true,
      meals: true,
      entertainment: true,
    },
  },
  {
    id: "2",
    price: "$3,380",
    departureTime: "10:00",
    flightNumber: "KE0654",
    origin: "ADD (Addis Ababa Airport)",
    destination: "DXB (Dubai International Airport)",
    transitTime: "04:00",
    duration: "06:00",
    stops: "1 Stop",
    arrivalTime: "20:00",
    airlines: {
      logo: "https://www.gstatic.com/flights/airline_logos/70px/SQ.png",
      name: "Singapore Airlines",
    },
    amenities: {
      wifi: true,
      usb: true,
      meals: true,
      entertainment: true,
    },
  },
];
const FlightListingPage: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFlightSearchState(roundTripBusiness));
  }, [dispatch]);


  const { flightSections } = useSelector(
    (state: RootState) => state.flightSearch
  );

 useEffect(() => {
    console.log(flightSections);
  }, [flightSections]);

  const [filter, setFilter] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const filteredData = DEMO_DATA.filter((stay) => {
    if (!filter) return true;

  }).slice(0, 10); 

  const [showFlightInfo, setShowFlightInfo] = useState<boolean>(false);

  const handleSetShowFlightInfo = useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (newState) => {
      setShowFlightInfo(newState);
    },
    []
  );

  useScrollHandler({ setShowFlightInfo: handleSetShowFlightInfo });


  const renderSidebar = () => {
    return (
      <div className="w-full mt-48 flex flex-col items-center text-center sm:rounded-2xl space-y-2 sm:space-y-2 px-0 sm:p-4 xl:p-2 relative">
        <div className="absolute inset-y-0 right-0 w-[20vw] dark:hidden"></div>
        <div className="absolute bottom-0 right-0 top-16 hidden h-48 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
        <div className="absolute bottom-0 right-0 top-54 hidden w-px bg-slate-800 dark:block"></div>
        <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] overflow-y-auto py-8 pl-0.3 pr-4 xl:pr-8 scrollbar-hidden">
          <FlightFilter />
        </div>
      </div>
    );
  };
  const [openSheetId, setOpenSheetId] = useState<string | null>(null);

  const handleSheetOpen = (id: string) => {
    setOpenSheetId(id);
  };

  const handleSheetClose = () => {
    setOpenSheetId(null);
  };
  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap mt-48">
        <Categories onFilterChange={setFilter} />
        {DEMO_DATA.filter((_, i) => i < 10).map((stay) => (
          <FlightCard
            key={stay.id}
            data={stay}
            isSheetOpen={openSheetId === stay.id}
            setIsSheetOpen={() => handleSheetOpen(stay.id)}
            onCloseSheet={handleSheetClose}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="overflow-hidden bg-blue-400 relative ">
      <div className="relative z-10 flex items-center justify-center container mx-auto px-4 w-full ">
        {!showFlightInfo && (
          <div className="bg-white px-6 ml-6 py-2 rounded-lg transform translate-y-[70%] transition-transform duration-300">
            <FlightSearchForm />
          </div>
        )}
      </div>

      {!openSheetId && showFlightInfo && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md rounded-md">
          <FlightInfo
            departure="New York"
            destination="Los Angeles"
            passengerCount={1}
            cabinClass="Economy"
            travelDates="2024-08-01 to 2024-08-15"
          />
        </div>
      )}
      <div className="mx-auto px-4 mt-6 relative mb-24 lg:mb-28 inset-0 bg-gray-100 dark:bg-black/20  inset-y-0 w-screen  rounded-xl xl:rounded-tl-[40px] xl:rounded-tr-[40px] z-0 ">
        <div className={`nc-AuthorPage `}>
          <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
            <div className="hidden md:flex absolute items-center justify-center mt-20 ml-6 mx-auto bg-white px-4 sm:px-2 md:px-4 lg:px-4 rounded-lg dark:bg-black/20 z-30">
              <DateTabs dateRanges={dateRanges} />
            </div>
            <div className="block flex-grow mb-24 lg:mb-0">
              <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
            </div>
            <div className="w-full lg:w-4/5 xl:w-2/3 space-y-4 lg:space-y-6 lg:pl-4 flex-shrink-0">
              {renderSection1()}
            </div>
          </main>
        </div>
      </div>
    </main>
  );
};

export default FlightListingPage;
