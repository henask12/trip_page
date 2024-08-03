import React, { FC, useState } from "react";
import Image from "next/image";
import { Popover } from "@headlessui/react";
import {
  BoltIcon,
  FilmIcon,
  GlobeAltIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import { FlightCardProps } from "@/components/type";
import PopoverContent from "./PopoverContent";
import AmenityIcon from "./AmenityIcon";

const FlightCardHeader: FC<{ data: FlightCardProps["data"] }> = ({ data }) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [isPopoverAmenitiesVisible, setIsPopoverAmenitiesVisible] =
    useState(false);
  const [isPopoverDepartureVisible, setIsPopoverDepartureVisible] =
    useState(false);
  const [isPopoverArrivalVisible, setIsPopoverArrivalVisible] = useState(false);
  const [isTimeLineVisible, setIsTimeLineVisible] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-6 sm:space-y-0">
      <div className="relative w-20 lg:w-20 flex-shrink-0">
        <Image
          src={data.airlines.logo}
          width={40}
          height={40}
          className="w-10"
          alt="air-logo"
          sizes="40px"
        />
      </div>

      <div className=" flex-[3] whitespace-nowrap">
        <div
          className="text-sm w-32 lg:w-32 text-neutral-500 font-normal mt-0.5"
          onMouseEnter={() => setIsPopoverVisible(true)}
          onMouseLeave={() => setIsPopoverVisible(false)}
        >
          {data.airlines.name}{" "}
          {isPopoverVisible && (
            <Popover className="absolute flex items-center top-12 z-10 text-white text-xs rounded-lg">
              <div className="absolute z-10 w-max max-w-xs sm:max-w-sm px-2 mt-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
                <div className="relative flex items-center px-3 py-2 space-x-2">
                  <Image
                    src={data.airlines.logo}
                    width={8}
                    height={8}
                    alt="air-logo"
                    sizes="30px"
                    className="w-8 h-8"
                  />
                  <div className="text-gray-900 dark:text-gray-100">
                    {data.airlines.name} {data.flightNumber}
                  </div>
                </div>
              </div>
            </Popover>
          )}
        </div>
        <div
          className="text-sm text-neutral-500 font-normal mt-0.5 flex space-x-2 items-center"
          onMouseEnter={() => setIsPopoverAmenitiesVisible(true)}
          onMouseLeave={() => setIsPopoverAmenitiesVisible(false)}
        >
          <AmenityIcon type="wifi" visible={data.amenities.wifi} />
          <AmenityIcon type="usb" visible={data.amenities.usb} />
          <AmenityIcon type="meals" visible={data.amenities.meals} />
          <AmenityIcon
            type="entertainment"
            visible={data.amenities.entertainment}
          />
          {isPopoverAmenitiesVisible && (
            <PopoverContent
              logo={data.airlines.logo}
              name={data.airlines.name}
              flightNumber={data.flightNumber}
              amenities={data.amenities}
              co2Emissions={data.co2Emissions}
              flightClass={data.flightClass}
            />
          )}
        </div>
      </div>

      <div className=" sm:block flex-[6] whitespace-nowrap">
        <div className="font-medium text-lg flex items-center justify-between">
          <span
            className="hover:text-blue-500 cursor-pointer"
            onMouseEnter={() => setIsPopoverDepartureVisible(true)}
            onMouseLeave={() => setIsPopoverDepartureVisible(false)}
          >
            {data.departureTime}
          </span>
          <div
            className="relative flex-1 mx-4"
            onMouseEnter={() => setIsTimeLineVisible(true)}
            onMouseLeave={() => setIsTimeLineVisible(false)}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="text-gray-600 dark:text-gray-400">
                {data.duration}
              </span>
            </div>

            <div className="absolute top-1 left-0 right-0 flex items-center justify-between">
              <div
                className="flex items-center justify-center w-4 h-4 shrink-0"
                style={{ marginLeft: "-0.75rem" }}
              >
                <svg
                  className="w-3 h-3 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.4A8.4 8.4 0 1 1 18.4 10 8.4 8.4 0 0 1 10 18.4z" />
                </svg>
              </div>
              <div
                className="flex items-center justify-center w-4 h-4 shrink-0"
                style={{ marginRight: "-0.75rem" }}
              >
                <svg
                  className="w-3 h-3 text-blue-800 dark:text-blue-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18.4A8.4 8.4 0 1 1 18.4 10 8.4 8.4 0 0 1 10 18.4z" />
                </svg>
              </div>
            </div>
            <div className="absolute top-3 left-0 right-0 w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <span
            className="hover:text-blue-500 cursor-pointer"
            onMouseEnter={() => setIsPopoverArrivalVisible(true)}
            onMouseLeave={() => setIsPopoverArrivalVisible(false)}
          >
            {data.arrivalTime}
          </span>
        </div>
        <div className="text-sm text-neutral-500 font-normal mt-0.5 flex justify-between">
          <span
            className="hover:text-blue-500 cursor-pointer"
          >
            HKG T1
          </span>
          <span>Nonstop</span>
          <span className="hover:text-blue-500 cursor-pointer">BKK T1</span>
        </div>

        {isPopoverDepartureVisible && (
          <Popover className="absolute flex items-center top-12 z-10 text-white text-sm rounded-lg bg-white  ">
            <div className="absolute z-10 w-max max-w-xs sm:max-w-sm px-2 mt-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="relative flex items-center px-3 py-4 space-x-2">
                <div className="text-gray-900 dark:text-gray-100">
                  {data.origin ?? "Hong Kong International Airport T1"}
                </div>
              </div>
            </div>
          </Popover>
        )}
        {isPopoverArrivalVisible && (
          <Popover className="absolute flex items-center top-12 z-10 text-white text-sm rounded-lg ">
            <div className="absolute transform translate-x-1/2 z-10 w-max max-w-xs sm:max-w-sm px-2 mt-3 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="relative px-3 py-4 space-x-2">
                <div className="text-gray-900 dark:text-gray-100">
                  {data.destination ?? "Suvarnabhumi Airport"}
                </div>
              </div>
            </div>
          </Popover>
        )}

        {isTimeLineVisible && (
          <Popover className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10 text-sm">
            <div className="w-96 px-2 py-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700">
              <div className="relative py-2">
                <div className="flex items-start">
                  <div className="relative w-1/4">
                    <div className="border-l-2 border-gray-300 absolute left-1/2 transform -translate-x-1/2 h-full"></div>
                  </div>
                  <div className="w-3/4">
                    <div className="mb-6">
                      <div className="text-gray-900 dark:text-white font-medium">
                        {data.origin ?? "Hong Kong International Airport T1"}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-medium">
                        {data.destination ?? "Suvarnabhumi Airport"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popover>
        )}
      </div>


      <div className="flex-[4] whitespace-nowrap sm:text-right">
        <div>
          <span className="text-xl font-semibold text-secondary-6000">
            {data.price}
          </span>
        </div>
        <div className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
          round-trip
        </div>
      </div>
    </div>
  );
};

export default FlightCardHeader;
