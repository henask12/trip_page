"use client";

import React, { FC, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Fragment } from "react";
import NcInputNumber from "@/components/NcInputNumber";
import FlightDateRangeInput from "./FlightDateRangeInput";
import { GuestsObject } from "@/components/type";
import LocationInput from "@/components/LocationInput";
import { PaperAirplaneIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ClearDataButton from "@/components/ClearDataButton";
import * as Yup from "yup";
import {
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  useFormikContext,
} from "formik";

export interface FlightSearchFormProps {}

const flightClass = [
  {
    name: "Economy",
    href: "##",
  },
  {
    name: "Business",
    href: "##",
  },
];

const tripType = [
  {
    name: "One-Way",
    href: "##",
  },
  {
    name: "Round-Trip",
    href: "##",
  },
  {
    name: "Multi-City",
    href: "##",
  },
];

interface FlightSection {
  origin: string;
  destination: string;
  flightDates: [Date | null, Date | null];
}

interface FormValues {
  flightSections: FlightSection[];
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
  tripType: string;
  class: string;
}

const initialValues: FormValues = {
  flightSections: [{ origin: "", destination: "", flightDates: [null, null] }],
  guestAdults: 1,
  guestChildren: 0,
  guestInfants: 0,
  tripType: "",
  class: "",
};

const validationSchema = Yup.object().shape({
  flightSections: Yup.array()
    .of(
      Yup.object().shape({
        origin: Yup.string().required("Origin is required"),
        destination: Yup.string().required("Destination is required"),
        flightDates: Yup.array()
          .of(Yup.date().nullable())
          .length(2, "Two dates are required")
          .required("Flight dates are required"),
      })
    )
    .required("Flight sections are required"),
  guestAdults: Yup.number().optional(),
  guestChildren: Yup.number().optional(),
  guestInfants: Yup.number().optional(),
  tripType: Yup.string().optional(),
  class: Yup.string().optional(),
});

const FlightSearchForm: FC<FlightSearchFormProps> = ({}) => {
  const [flightClassState, setFlightClassState] = useState("Economy");
  const [tripTypeState, setTripTypeState] = useState("One-Way");

  const handleSubmit = (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  const addFlightSection = (
    push: (value: {
      origin: string;
      destination: string;
      flightDates: [Date | null, Date | null];
    }) => void
  ) => {
    push({
      origin: "",
      destination: "",
      flightDates: [null, null],
    });
  };

  const removeFlightSection = (
    index: number,
    remove: (index: number) => void
  ) => {
    remove(index);
  };

  const renderSelectTripType = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`${
                open ? "bg-gray-200 dark:bg-gray-700" : ""
              } px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
            >
              <span>{`${tripTypeState}`}</span>
              <ChevronDownIcon
                className={`${
                  open ? "text-opacity-100" : "text-opacity-70"
                } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-20 w-screen max-w-[200px] sm:max-w-[220px] px-4 top-full mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7">
                    {tripType.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setTripTypeState(item.name);
                          close();
                        }}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <p className="text-sm font-medium">{item.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };
  const renderSelectClass = () => {
    return (
      <Popover className="relative">
        {({ open, close }) => (
          <>
            <Popover.Button
              className={`
           ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
            >
              <span>{`${flightClassState}`}</span>
              <ChevronDownIcon
                className={`${
                  open ? "" : "text-opacity-70"
                } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-20 w-screen max-w-[200px] sm:max-w-[220px] px-4 top-full mt-3 transform -translate-x-1/2 left-1/2 sm:px-0  ">
                <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10 ">
                  <div className="relative grid gap-8 bg-white dark:bg-neutral-800 p-7 ">
                    {flightClass.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault();
                          setFlightClassState(item.name);
                          close();
                        }}
                        className="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                      >
                        <p className="text-sm font-medium ">{item.name}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };

  const renderGuest = () => {
  
    return (
      <Popover className="flex relative">
        {({ open }) => (
          <>
            <Popover.Button
              as="button"
              className={`
             ${open ? "" : ""}
            px-4 py-1.5 rounded-md inline-flex items-center font-medium hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 text-xs`}
            >
              <span>{`${ 0|| ""} Guests`}</span>
              <ChevronDownIcon
                className={`${
                  open ? "" : "text-opacity-70"
                } ml-2 h-4 w-4 group-hover:text-opacity-80 transition ease-in-out duration-150`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-20 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 left-1/2 -translate-x-1/2  py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl ring-1 ring-black/5 dark:ring-white/10">
                {() => (
                  <Form>
                    <Field
                      name="guestAdults"
                      component={NcInputNumber}
                      label="Adults"
                      desc="Ages 13 or above"
                      min={1}
                      max={10}
                      className="w-full"
                    />
                    <Field
                      name="guestChildren"
                      component={NcInputNumber}
                      label="Children"
                      desc="Ages 2–12"
                      min={0}
                      max={4}
                      className="w-full mt-6"
                    />
                    <Field
                      name="guestInfants"
                      component={NcInputNumber}
                      label="Infants"
                      desc="Ages 0–2"
                      min={0}
                      max={4}
                      className="w-full mt-6"
                    />
                  </Form>
                )}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    );
  };


  const renderRadioBtn = () => {
    return (
      <div className="  [ nc-hero-field-padding ] flex flex-row flex-wrap  border-neutral-100 dark:border-neutral-700">
        <div className="mr-2 my-1 sm:mr-3 border border-neutral-300 dark:border-neutral-700 rounded-full">
          {renderSelectTripType()}
        </div>
        <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8 mr-2 my-1 sm:mr-3"></div>

        <div className="mr-2 my-1 sm:mr-3 border border-neutral-300 dark:border-neutral-700 rounded-full">
          {renderSelectClass()}
        </div>
        <div className="my-1 border border-neutral-300 dark:border-neutral-700 rounded-full">
          {renderGuest()}
        </div>
      </div>
    );
  };

  const renderMultiCityForm = () => {
    return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <FieldArray name="flightSections">
              {({ push, remove }) => (
                <>
                  {values.flightSections.map((section, index) => (
                    <div key={index} className=" flex flex-1 mt-1 ml-2">
                      <Field name={`flightSections[${index}].origin`}>
                        {({ field }: any) => (
                          <LocationInput
                            {...field}
                            placeHolder="Flying to"
                            desc="Where do you want to fly to?"
                            className="w-1/4"
                            divHideVerticalLineClass="-inset-x-0.5"
                            setFieldValue={setFieldValue}
                            fieldName={`flightSections[${index}].origin`}
                          />
                        )}
                      </Field>
                      <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                      <PaperAirplaneIcon className="h-5 w-5 mx-2 justify-center items-center mt-6 text-blue-500" />
                      <Field name={`flightSections[${index}].destination`}>
                        {({ field }: any) => (
                          <LocationInput
                            {...field}
                            placeHolder="Flying to"
                            desc="Where do you want to fly to?"
                            className="w-1/4"
                            divHideVerticalLineClass="-inset-x-0.5"
                            setFieldValue={setFieldValue}
                            fieldName={`flightSections[${index}].destination`}
                          />
                        )}
                      </Field>

                      <div className="self-center border-r border-slate-200 px-2 dark:border-slate-700 h-8"></div>
                      <Field name={`flightSections[${index}].flightDates`}>
                        {({ field }: any) => (
                          <FlightDateRangeInput
                            {...field}
                            selectsRange={tripTypeState === "Round-Trip"}
                            className="mb-4 w-1/4"
                            onChange={(dates: [Date | null, Date | null]) => {
                              setFieldValue(
                                `flightSections[${index}].flightDates`,
                                dates
                              );
                            }}
                          />
                        )}
                      </Field>
                      {index === values.flightSections.length - 1 &&
                        index >= 2 && (
                          <div className="absolute inset-x-0 items-start flex justify-center">
                            <ClearDataButton
                              newClass="mt-10"
                              onClick={() => removeFlightSection(index, remove)}
                            />
                          </div>
                        )}
                    </div>
                  ))}
                  <div className="flex flex-1 mt-1">
                    <ButtonSecondary
                      type="button"
                      className="w-4/5 h-5 hover:border-blue-400"
                      onClick={() => addFlightSection(push)}
                    >
                      <PlusCircleIcon className="h-5 w-5 mr-2" />{" "}
                      <span> Add another flight</span>
                    </ButtonSecondary>
                    <ButtonPrimary type="submit" className="w-1/5">
                      Search
                    </ButtonPrimary>
                  </div>
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    );
  };

  const renderForm = () => {
    return (
      <div className="w-full relative mb-2 dark:bg-neutral-800 ">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="w-full relative mb-2 dark:bg-neutral-800">
              {renderRadioBtn()}
              {tripTypeState !== "Multi-City" ? (
                <div className=" flex flex-1">
                  {" "}
                  <>
                    {" "}
                    <Field name={`flightSections[0].origin`}>
                      {({ field }: any) => (
                        <LocationInput
                          {...field}
                          placeHolder="Flying to"
                          desc="Where do you want to fly to?"
                          className="w-1/4"
                          divHideVerticalLineClass="-inset-x-0.5"
                          setFieldValue={setFieldValue}
                          fieldName={`flightSections[0].origin`}
                        />
                      )}
                    </Field>
                    <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
                    <PaperAirplaneIcon className="h-5 w-5 mx-2 justify-center items-center mt-6 text-blue-500" />
                    <Field name={`flightSections[0].destination`}>
                      {({ field }: any) => (
                        <LocationInput
                          {...field}
                          placeHolder="Flying to"
                          desc="Where do you want to fly to?"
                          className="w-1/4"
                          divHideVerticalLineClass="-inset-x-0.5"
                          setFieldValue={setFieldValue}
                          fieldName={`flightSections[0].destination`}
                        />
                      )}
                    </Field>
                    <div className="self-center border-r border-slate-200 px-2 dark:border-slate-700 h-8"></div>
                    <Field name="flightSections[0].flightDates">
                      {({ field }: any) => (
                        <FlightDateRangeInput
                          {...field}
                          selectsRange={tripTypeState === "Round-Trip"}
                          className="mb-4 w-1/4"
                          onChange={(dates: [Date | null, Date | null]) => {
                            setFieldValue(
                              "flightSections[0].flightDates",
                              dates
                            );
                          }}
                        />
                      )}
                    </Field>
                    <div className="self-center border-r border-slate-200 px-2 dark:border-slate-700 h-8"></div>
                    <ButtonPrimary type="submit">Search</ButtonPrimary>{" "}
                  </>
                </div>
              ) : (
                <>{renderMultiCityForm()}</>
              )}
            </Form>
          )}
        </Formik>
      </div>
    );
  };

  return renderForm();
};

export default FlightSearchForm;
