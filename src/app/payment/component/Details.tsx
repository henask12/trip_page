"use client";

import {
  CheckCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import React, { FC, Fragment, useState } from "react";
import Input from "@/shared/Input";
import Label from "@/shared/Label";
import ModalSelectDate from "@/components/ModalSelectDate";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setFlightSearchState } from "@/features/flightSearch/flightSearchSlice";
import PassengerForm from "./PassengerForm";
import PhoneNumberInput from "@/shared/PhoneNumberInput";

export interface CheckOutPagePageMainProps {
  className?: string;
}
const includes_demo = [
  { name: "Free cancellation up to 48 hours before pick-up" },
  { name: "Collision Damage Waiver with $214 deductible" },
  { name: "Theft Protection with $19,999 excess" },
];

export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}
const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2024/08/08")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2024/08/19"));
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
  };
  const dispatch = useDispatch();
  const flightSearch = useSelector((state: RootState) => state.flightSearch);
  const [dynamicPassengers, setDynamicPassengers] = useState({
    guestAdults: 0,
    guestChildren: 0,
    guestInfants: 0,
  });
  const addPassenger = (type: "adult" | "child" | "infant") => {
    const newPassenger = {
      guestAdults: flightSearch.guestAdults + (type === "adult" ? 1 : 0),
      guestChildren: flightSearch.guestChildren + (type === "child" ? 1 : 0),
      guestInfants: flightSearch.guestInfants + (type === "infant" ? 1 : 0),
    };
    dispatch(setFlightSearchState({ ...flightSearch, ...newPassenger }));
    setDynamicPassengers((prev) => ({
      guestAdults: prev.guestAdults + (type === "adult" ? 1 : 0),
      guestChildren: prev.guestChildren + (type === "child" ? 1 : 0),
      guestInfants: prev.guestInfants + (type === "infant" ? 1 : 0),
    }));
  };
  const removePassenger = (
    type: "Adult" | "Child" | "Infant",
    index: number
  ) => {
    if (type === "Adult" && dynamicPassengers.guestAdults > 0) {
      const updatedAdults = flightSearch.guestAdults - 1;
      dispatch(
        setFlightSearchState({ ...flightSearch, guestAdults: updatedAdults })
      );

      setDynamicPassengers((prev) => ({
        ...prev,
        guestAdults: prev.guestAdults - 1,
      }));
    } else if (type === "Child" && dynamicPassengers.guestChildren > 0) {
      const updatedChildren = flightSearch.guestChildren - 1;
      dispatch(
        setFlightSearchState({
          ...flightSearch,
          guestChildren: updatedChildren,
        })
      );

      setDynamicPassengers((prev) => ({
        ...prev,
        guestChildren: prev.guestChildren - 1,
      }));
    } else if (type === "Infant" && dynamicPassengers.guestInfants > 0) {
      const updatedInfants = flightSearch.guestInfants - 1;
      dispatch(
        setFlightSearchState({ ...flightSearch, guestInfants: updatedInfants })
      );

      setDynamicPassengers((prev) => ({
        ...prev,
        guestInfants: prev.guestInfants - 1,
      }));
    }
  };

  const renderPassenger = () => {
    return (
      <div className="space-y-6">
        <PassengerForm
          guestAdults={flightSearch.guestAdults}
          guestChildren={flightSearch.guestChildren}
          guestInfants={flightSearch.guestInfants}
          removePassenger={removePassenger}
          dynamicPassengers={dynamicPassengers}
        />

        <div className="pr-4 rounded-lg relative">
          {flightSearch.guestChildren === 0 &&
            flightSearch.guestInfants === 0 && (
              <ButtonSecondary
                type="button"
                className="w-full h-5 hover:border-blue-400"
                onClick={() => addPassenger("adult")}
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />{" "}
                <span> Add another Adult Passenger</span>
              </ButtonSecondary>
            )}
          {/* <ButtonSecondary
            type="button"
            className="w-full h-5 hover:border-blue-400"
            onClick={() => addPassenger('child')}
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />{' '}
            <span> Add another Child Passenger</span>
          </ButtonSecondary>
          <ButtonSecondary
            type="button"
            className="w-full h-5 hover:border-blue-400"
            onClick={() => addPassenger('infant')}
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />{' '}
            <span> Add another Infant Passenger</span>
          </ButtonSecondary> */}
        </div>
      </div>
    );
  };
  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap lg:shadow-xl">
        <span className="text-2xl font-semibold block">Depart From ADD</span>
        <div className="mt-8 flex">
          <div className="flex-shrink-0 flex flex-col items-center py-2">
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
            <span className="block flex-grow border-l border-neutral-400 border-dashed my-1"></span>
            <span className="block w-6 h-6 rounded-full border border-neutral-400"></span>
          </div>
          <div className="ml-4 space-y-14 text-sm">
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Monday, August 12 · 10:00
              </span>
              <span className=" font-semibold">
                Addis Ababa International Airport Terminal 1
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Monday, August 16 · 10:00
              </span>
              <span className=" font-semibold">
                Dubai International Airport Terminal 1
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const TicketPolicy = () => {
    return (
      <>
        {" "}
        <div
          className={`nc-WidgetTags rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800`}
        >
          <div
            className={`nc-WidgetHeading1 flex items-center justify-between p-4 xl:p-5 border-b border-neutral-200 dark:border-neutral-700`}
          >
            <h2 className="text-lg text-neutral-900 dark:text-neutral-100 font-semibold flex-grow">
              🏷 Your Ticket(s)
            </h2>

            <div className="flex-shrink-0 block text-gray-700 dark:text-gray-500 font-semibold text-sm">
              Details
            </div>
          </div>
        </div>
        <div className="grid container rounded-2xl shadow-lg  bg-white px-2 grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Baggage Allowance Column */}
          <div className=" dark:bg-gray-900  p-4">
            <h3 className="text-lg font-semibold mb-4 text-neutral-700 dark:text-neutral-300">
              Baggage Allowance
            </h3>
            <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              {includes_demo
                .filter((_, i) => i < 12)
                .map((item) => (
                  <div key={item.name} className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                    <span>{item.name}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Policies Column */}
          <div className=" dark:bg-gray-900 p-4">
            <h3 className="text-lg font-semibold mb-4 text-neutral-700 dark:text-neutral-300">
              Policies
            </h3>
            <div className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              {includes_demo
                .filter((_, i) => i < 12)
                .map((item) => (
                  <div key={item.name} className="flex items-center space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
                    <span>{item.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderContact = () => {
    return (
      <div className="bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>Gender</Label>
          <Input placeholder="Gender" />
        </div>
        <div className="space-y-2">
          <Label>Date of birth</Label>
          <Input type="date" />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <PhoneNumberInput
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div></div>
    );
  };

  const renderMain = () => {
    return (
      <div className="flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-4 px-0 sm:p-4 xl:p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl lg:text-4xl font-semibold">Trip to Dubai</h2>
          <ModalSelectDate
            renderChildren={({ openModal }) => (
              <button
                onClick={openModal}
                className="text-left flex items-center p-2 space-x-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                type="button"
              >
                <div className="flex flex-col">
                  <span className="text-sm text-neutral-400">Change Date</span>
                  <div className="flex items-center space-x-1">
                    <span className="mt-1.5 text-lg font-semibold">
                      {converSelectedDateToString([startDate, endDate])}
                    </span>
                    <PencilSquareIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  </div>
                </div>
              </button>
            )}
          />
        </div>

        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div className="border border-neutral-200 dark:border-neutral-700 rounded-3xl flex  sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            {renderSidebarDetail()}
          </div>
          <div className="border overflow-hidden z-10 mt-3 rounded-2xl">
            {TicketPolicy()}
          </div>
        </div>
        <h3 className="text-2xl font-semibold">Who's Traveling?</h3>
        {renderPassenger()}
        <h3 className="text-2xl font-semibold">Contact Details</h3>
            {renderContact()}
        
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>{renderMain()}</div>
  );
};

export default CheckOutPagePageMain;
