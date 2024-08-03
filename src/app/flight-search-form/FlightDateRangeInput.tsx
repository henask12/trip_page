"use client";
import React, { Fragment, useState, useEffect } from "react";
import { FC } from "react";
import DatePicker from "react-datepicker";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "@/components/ClearDataButton";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";

export interface FlightDateRangeInputProps {
  className?: string;
  fieldClassName?: string;
  selectsRange?: boolean;
  value?: [Date | null, Date | null];
  onChange?: (dates: [Date | null, Date | null]) => void;
}

const FlightDateRangeInput: FC<FlightDateRangeInputProps> = ({
  className = "",
  fieldClassName = "[ nc-hero-field-padding ]",
  selectsRange = true,
  value = [null, null],
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(value?.[0] ?? null);
  const [endDate, setEndDate] = useState<Date | null>(value?.[1] ?? null);
  
  useEffect(() => {
    if (value) {
      setStartDate(value[0] ?? null);
      setEndDate(value[1] ?? null);
    }
  }, [value]);
  

  const onChangeRangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onChange) onChange(dates);
  };

  const formatDate = (date: Date) => {
    return date instanceof Date && !isNaN(date.getTime())
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })
      : "Invalid Date";
  };

  const renderInput = () => {

    return (
      <>
        <div className="text-neutral-300 dark:text-neutral-400">
          <CalendarIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div className="flex-grow text-left">
          <span className="block xl:text-lg font-semibold">
            {(startDate && formatDate(startDate)) || "Add dates"}
            {selectsRange && endDate ? " - " + formatDate(endDate) : ""}
          </span>
          <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
            {selectsRange ? "Departure - Return" : "Departure"}
          </span>
        </div>
      </>
    );
  };

  return (
    <Popover className={`FlightDateRangeInput relative mt-2 ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex z-10 flex-1 rounded-lg relative border [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left ${
              open
                ? "border text-sm block w-full p-2.5 dark:placeholder-white dark:text-white"
                : ""
            }`}
          >
            <Popover.Button
              className={`flex-1 z-10 flex relative ${fieldClassName} items-center space-x-3 focus:outline-none`}
            >
              {renderInput()}

              {startDate && open && (
                <ClearDataButton
                  onClick={() => onChangeRangeDate([null, null])}
                />
              )}
            </Popover.Button>
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-10 bg-white dark:bg-neutral-800"></div>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute left-1/2 z-20 mt-3 top-full w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-3xl">
              <div className="overflow-hidden rounded-3xl shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-neutral-800 p-8">
                {selectsRange ? (
                  <DatePicker
                    selected={startDate}
                    onChange={onChangeRangeDate}
                    startDate={startDate ?? undefined}
                    endDate={endDate ?? undefined}
                    selectsRange
                    monthsShown={2}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                ) : (
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => onChangeRangeDate([date, null])}
                    monthsShown={2}
                    showPopperArrow={false}
                    inline
                    renderCustomHeader={(p) => (
                      <DatePickerCustomHeaderTwoMonth {...p} />
                    )}
                    renderDayContents={(day, date) => (
                      <DatePickerCustomDay dayOfMonth={day} date={date} />
                    )}
                  />
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default FlightDateRangeInput;
