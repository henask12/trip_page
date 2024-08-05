"use client";

import { FC, useCallback, useEffect } from "react";
import FlightSearchForm from "../flight-search-form/FlightSearchForm";
import DateTabs from "@/components/DateTabs";
import React, { useState } from "react";
import FlightCard from "@/components/cards/FlightCard";
import Categories from "@/components/cards/flight/catagories";
import { FlightCardProps, FlightSegment, isFlightSegment, isMultiCityData, isRoundTripData, MultiCityData, RoundTripData, TripType } from "@/components/type";
import FlightFilter from "@/components/cards/flight/FlightFilter";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import FlightInfo from "@/components/cards/flight/FlightInfo";
import useScrollHandler from "@/utils/useScroll";

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
const ONE_WAY_DEMO_DATA: FlightSegment = {
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
};

const ROUND_TRIP_DEMO_DATA: RoundTripData = {
  departingFlight: {
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
  returningFlight: {
    id: "2",
    price: "$3,380",
    departureTime: "15:00",
    stops: "Direct",
    arrivalTime: "22:00",
    transitTime: "03:00",
    duration: "05:00",
    flightNumber: "KE0655",
    origin: "DXB (Dubai International Airport)",
    destination: "ADD (Addis Ababa Airport)",
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
  }
};
const MULTI_CITY_DEMO_DATA: MultiCityData = {
  legs: [
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
      departureTime: "11:00",
      stops: "Direct",
      arrivalTime: "14:00",
      duration: "03:00",
      flightNumber: "SQ901",
      origin: "DXB (Dubai International Airport)",
      destination: "JFK (John F. Kennedy International Airport)",
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
      departureTime: "16:00",
      stops: "1 Stop",
      arrivalTime: "22:00",
      transitTime: "02:00",
      duration: "05:00",
      flightNumber: "BA123",
      origin: "JFK (John F. Kennedy International Airport)",
      destination: "LAX (Los Angeles International Airport)",
      airlines: {
        logo: "https://www.gstatic.com/flights/airline_logos/70px/BA.png",
        name: "British Airways",
      },
      amenities: {
        wifi: true,
        usb: true,
        meals: true,
        entertainment: true,
      },
    }
  ]
};

const FlightListingPage: FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const [showFlightInfo, setShowFlightInfo] = useState<boolean>(false);

  // Correctly typing handleSetShowFlightInfo
  const handleSetShowFlightInfo = useCallback<React.Dispatch<React.SetStateAction<boolean>>>(
    (newState) => {
      setShowFlightInfo(newState);
    },
    []
  );

  useScrollHandler({ setShowFlightInfo: handleSetShowFlightInfo });


  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     const triggerPosition = 100;
  //     setShowFlightInfo(scrollPosition > triggerPosition);
  //   };

  //   const debouncedHandleScroll = debounce(handleScroll, 50);

  //   window.addEventListener("scroll", debouncedHandleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", debouncedHandleScroll);
  //   };
  // }, []);

  // function debounce<T extends (...args: any[]) => void>(
  //   func: T,
  //   wait: number
  // ): (...args: Parameters<T>) => void {
  //   let timeout: NodeJS.Timeout;
  //   return function (...args: Parameters<T>) {
  //     if (timeout) clearTimeout(timeout);
  //     timeout = setTimeout(() => func(...args), wait);
  //   };
  // }
  const renderSidebar = () => {
    return (
      <div className="listingSectionSidebar__wrap">
        <div className="w-full  mt-48 flex flex-col items-center text-center sm:rounded-2xl space-y-2 sm:space-y-2 px-0 sm:p-4 xl:p-2 relative">
          <div className="absolute inset-y-0 right-0 w-[20vw] dark:hidden"></div>
          <div className="absolute bottom-0 right-0 top-16 hidden h-48 w-px bg-gradient-to-t from-slate-800 dark:block"></div>
          <div className="absolute bottom-0 right-0 top-54 hidden w-px bg-slate-800 dark:block"></div>
          <div className="sticky top-[4.75rem] -ml-0.5 h-[calc(100vh-4.75rem)] overflow-y-auto py-8 pl-0.3 pr-4 xl:pr-8 scrollbar-hidden">
            <FlightFilter />
          </div>
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

  const [tripType, setTripType] = useState<TripType>('round-trip');
  const [data, setData] = useState<FlightSegment | RoundTripData | MultiCityData>(ROUND_TRIP_DEMO_DATA);
  const [selectedDepartingFlight, setSelectedDepartingFlight] = useState<string | null>(null);
  const [selectedLeg, setSelectedLeg] = useState<number>(0);


  useEffect(() => {
    // Set data based on tripType
    if (tripType === 'one-way') {
      setData(ONE_WAY_DEMO_DATA);
    } else if (tripType === 'round-trip') {
      setData(ROUND_TRIP_DEMO_DATA);
    } else if (tripType === 'multi-city') {
      setData(MULTI_CITY_DEMO_DATA);
    }
  }, [tripType]);

  const renderSection1 = () => {
    if (tripType === 'multi-city' && isMultiCityData(data)) {
      return (
        <div className="listingSection__wrap mt-48">
          <Categories onFilterChange={setFilter} />
          <FlightCard
            key={data.legs[selectedLeg].id}
            data={data.legs[selectedLeg]}
            isSheetOpen={openSheetId === data.legs[selectedLeg].id}
            setIsSheetOpen={() => setOpenSheetId(data.legs[selectedLeg].id)}
            onCloseSheet={handleSheetClose}
            tripType={tripType}
          />
          {selectedLeg < data.legs.length - 1 && (
            <button
              onClick={() => setSelectedLeg(selectedLeg + 1)}
              className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
              Show Next Leg
            </button>
          )}
        </div>
      );
    } else if (tripType === 'round-trip' && isRoundTripData(data)) {
      return (
        <div className="listingSection__wrap mt-48">
          <Categories onFilterChange={setFilter} />
          {selectedDepartingFlight ? (
            <>
              <FlightCard
                key={data.returningFlight.id}
                data={data.returningFlight}
                isSheetOpen={openSheetId === data.returningFlight.id}
                setIsSheetOpen={() => setOpenSheetId(data.returningFlight.id)}
                onCloseSheet={handleSheetClose}
                tripType={tripType}
              />
            </>
          ) : (
            <FlightCard
              key={data.departingFlight.id}
              data={data.departingFlight}
              isSheetOpen={openSheetId === data.departingFlight.id}
              setIsSheetOpen={() => setOpenSheetId(data.departingFlight.id)}
              onCloseSheet={handleSheetClose}
              tripType={tripType}
              onSelect={() => setSelectedDepartingFlight(data.departingFlight.id)}
            />
          )}
        </div>
      );
    } else if (tripType === 'one-way' && isFlightSegment(data)) {
      return (
        <div className="listingSection__wrap mt-48">
          <Categories onFilterChange={setFilter} />
          <FlightCard
            key={data.id}
            data={data}
            isSheetOpen={openSheetId === data.id}
            setIsSheetOpen={() => setOpenSheetId(data.id)}
            onCloseSheet={handleSheetClose}
            tripType={tripType}
          />
        </div>
      );
    } else {
      return null;
    }
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
              <div className="sticky top-24 ">{renderSidebar()}</div>
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
