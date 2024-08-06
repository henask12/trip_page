import React, { useState } from "react";
import Image from "next/image";
import { Sheet } from "./sheet";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import {
  CheckIcon,
  ExclamationCircleIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import PrevBtn from "@/components/PrevBtn";
import NextBtn from "@/components/NextBtn";

export interface PricingItem {
  isRecommended: boolean;
  name: string;
  pricing: string;
  per: string;
  features: string[];
  baggage: {
    carryOn: string;
    checked: string;
  };
  fareRules: {
    cancellationFee: string;
    changeFees: string;
  };
}

const pricings: PricingItem[] = [
  {
    isRecommended: false,
    name: "Economy",
    pricing: "$5",
    per: "/mo",
    features: ["Automated Reporting", "Faster Processing", "Customizations"],
    baggage: {
      carryOn: "1 piece up to 7kg",
      checked: "None",
    },
    fareRules: {
      cancellationFee: "from $14",
      changeFees: "No Change Fees",
    },
  },
  {
    isRecommended: true,
    name: "Economy Flex",
    pricing: "$15",
    per: "/mo",
    features: [
      "Everything in Starter",
      "100 Builds",
      "Progress Reports",
      "Premium Support",
    ],
    baggage: {
      carryOn: "1 piece up to 7kg",
      checked: "2 pieces up to 23kg each",
    },
    fareRules: {
      cancellationFee: "from $14",
      changeFees: "No Change Fees",
    },
  },
  {
    isRecommended: false,
    name: "Economy Plus",
    pricing: "$25",
    per: "/mo",
    features: [
      "Everything in Basic",
      "Unlimited Builds",
      "Advanced Analytics",
      "Company Evaluations",
    ],
    baggage: {
      carryOn: "2 pieces up to 7kg each",
      checked: "2 pieces up to 23kg each",
    },
    fareRules: {
      cancellationFee: "from $14",
      changeFees: "No Change Fees",
    },
  },
];

const FlightDetail: React.FC<{
  data: any;
  onSelect: (id: string) => void;
  isSelected: boolean;
  isSheetOpen: boolean;
  setIsSheetOpen: () => void;
  onCloseSheet: () => void;
}> = ({
  data,
  onSelect,
  isSelected,
  isSheetOpen,
  setIsSheetOpen,
  onCloseSheet,
}) => {
  const [isSelectedLocal, setIsSelectedLocal] = useState<boolean>(isSelected);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 2;
  const totalItems = pricings.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage < totalItems
        ? prevIndex + itemsPerPage
        : prevIndex
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage >= 0 ? prevIndex - itemsPerPage : prevIndex
    );
  };

  const visibleItems = pricings.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  const showPrev = currentIndex > 0;
  const showNext = currentIndex + itemsPerPage < totalItems;

  const handleSelectClick = (id: string) => {
    setIsSelectedLocal(!isSelectedLocal);
    onSelect(id);
  };

  const handleSheetClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSheetOpen();
  };

  const renderPricingItem = (pricing: PricingItem, index: number) => (
    <div
      key={index}
      className={`h-full relative px-6 py-8 rounded-3xl bg-white border-2 flex flex-col overflow-hidden ${
        pricing.isRecommended
          ? "border-primary-500"
          : "border-neutral-100 dark:border-neutral-700"
      }`}
      onClick={() => handleSelectClick(data.id)}
    >
      {pricing.isRecommended && (
        <span className="bg-teal-500 text-white px-3 py-1 tracking-widest text-xs absolute right-3 top-3 rounded-full z-10">
          Recommended
        </span>
      )}
      <div className="mb-2">
        <h3 className="block text-sm uppercase tracking-widest text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
          {pricing.name}
        </h3>
        <hr />
      </div>

      {/* Baggage Rules  */}
      <div className="space-y-1 mb-4">
        <h5 className="block text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
          Baggage
        </h5>
        <div className="flex items-center">
          <span
            className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-primary-6000"
            onClick={handleSheetClick}
          >
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span
            className="text-neutral-700 cursor-pointer dark:text-neutral-300"
            onClick={handleSheetClick}
          >
            <strong>Carry-on Baggage:</strong> {pricing.baggage.carryOn}
          </span>
        </div>
        <div className="flex items-center">
          <span
            className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-primary-6000"
            onClick={handleSheetClick}
          >
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span
            className="text-neutral-700 cursor-pointer dark:text-neutral-300"
            onClick={handleSheetClick}
          >
            <strong>Checked Baggage:</strong> {pricing.baggage.checked}
          </span>
        </div>
      </div>

      {/* Fare Rules  */}
      <div className="space-y-1 mb-4">
        <h5 className="block text-neutral-6000 dark:text-neutral-300 mb-2 font-medium">
          Fare Rules
        </h5>
        <div className="flex items-center">
          <span
            className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-primary-6000"
            onClick={handleSheetClick}
          >
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span
            className="text-neutral-700 cursor-pointer dark:text-neutral-300"
            onClick={handleSheetClick}
          >
            <strong>Cancellation Fee:</strong>{" "}
            {pricing.fareRules.cancellationFee}
          </span>
        </div>
        <div className="flex items-center">
          <span
            className="mr-4 cursor-pointer inline-flex flex-shrink-0 text-primary-6000"
            onClick={handleSheetClick}
          >
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span
            className="text-neutral-700 cursor-pointer dark:text-neutral-300"
            onClick={handleSheetClick}
          >
            <strong>Change Fees:</strong> {pricing.fareRules.changeFees}
          </span>
        </div>
      </div>

      <div className="flex flex-col mt-auto">
        <ButtonSecondary>
          <span className="font-medium">Book</span>
        </ButtonSecondary>
      </div>
    </div>
  );

  return (
    <>
      <section className="text-neutral-600 text-sm md:text-base overflow-hidden relative">
        <div className="grid lg:grid-cols-2 gap-2">
          {visibleItems.map(renderPricingItem)}
        </div>
        {totalItems > itemsPerPage && (
          <>
            {showPrev && (
              <PrevBtn
                style={{ transform: "translate3d(0, 0, 0)" }}
                onClick={handlePrev}
                className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
              />
            )}
            {showNext && (
              <NextBtn
                style={{ transform: "translate3d(0, 0, 0)" }}
                onClick={handleNext}
                className="w-9 h-9 xl:w-12 xl:h-12 text-lg absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
              />
            )}
          </>
        )}
      </section>
      <Sheet
        open={isSheetOpen}
        onClose={onCloseSheet}
        side="right"
        title="Baggage Allowance & Policies"
        tabs={tabs}
      />
    </>
  );
};

export default FlightDetail;
const bookingInfo = (
  <div>
    <h2 className="text-xl font-bold mb-4 justify-start">
      Booking Information
    </h2>
    <div className=" dark:bg-black/20 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="font-bold mb-2">
        <span className="mr-4 mb-2 inline-flex cursor-pointer flex-shrink-0 text-teal-600">
          <CheckIcon className="w-5 h-5" aria-hidden="true" />
        </span>
        Ticket Issuing Time
      </h3>
      <p> Once payment is confirmed, tickets will be issued within 4 days.</p>
      <h3 className="font-bold mb-2 mt-2">
        <span className="mr-4  inline-flex cursor-pointer flex-shrink-0 text-yellow-600">
          <ExclamationCircleIcon className="w-5 h-5" aria-hidden="true" />
        </span>
        Using Tickets in Order
      </h3>
      <p>
        According to the airline's regulations, the tickets you have booked must
        be used in the order of the flight segments. Otherwise, the ticket fare,
        fuel surcharges, and government taxes will be recalculated based on the
        actual itinerary. If the recalculated amount exceeds the amount you have
        already paid for the tickets, you will be required to pay the
        difference. Additionally, any unused flight segments on the tickets will
        be considered invalid and cannot be used. The final decision will be
        subject to the approval of the operating carrier.
      </p>
      <h3 className="font-bold mb-2 mt-2">
        <span className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-yellow-600">
          <ExclamationCircleIcon className="w-5 h-5" aria-hidden="true" />
        </span>{" "}
        Notes
      </h3>
      <p>
        Addis Ababa - Dubai, Dubai - Addis Ababa: Passengers should carry a
        yellow fever vaccination certificate when leaving for or returning from
        a yellow fever epidemic area.
      </p>
    </div>
  </div>
);

const baggageAllowance = (
  <div>
    <h2 className="text-xl font-bold mb-4 justify-start">Baggage Allowance</h2>
    <div className="dark:bg-black/20 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 ">
      <h3 className="font-bold mb-4">
        {" "}
        <span className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-yellow-600">
          <ShoppingBagIcon className="w-5 h-5" aria-hidden="true" />
        </span>{" "}
        Depart: Addis Ababa - Dubai
      </h3>
      <p className="mb-1">
        <strong>Personal Item</strong>: The total weight per person cannot
        exceed 5 kg...
      </p>
      <p className="mb-1">
        <strong>Carry-on Baggage</strong>: 1 piece(s) per person, 7 kg per
        piece...
      </p>
      <p className="mb-1">
        <strong>Checked Baggage</strong>: 2 piece(s) per person, 23 kg per
        piece...
      </p>
    </div>{" "}
    <div className="dark:bg-black/20 mt-3 mb-3 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h3 className="font-bold">
        {" "}
        <span className="mr-4 inline-flex mb-3 cursor-pointer flex-shrink-0 text-yellow-600">
          <ShoppingBagIcon className="w-5 h-5" aria-hidden="true" />
        </span>{" "}
        Return: Dubai - Addis Ababa
      </h3>
      <p>
        <strong>Personal Item</strong>: The total weight per person cannot
        exceed 5 kg...
      </p>
    </div>
  </div>
);

const cancellationPolicy = (
  <div className="h-screen">
    <h3 className="font-bold">Flight Cancellation & Change Policies</h3>
    <p>
      The ticket policy is subject to the rules listed below, and these might
      differ from policies listed on the airline's website...
    </p>
    <div className="overflow-auto">
      <table className="w-full table-auto border-collapse border border-gray-200 text-left">
        <thead>
          <tr>
            <th className="border-b border-gray-200 p-2">Status</th>
            <th className="border-b border-gray-200 p-2">Request Time</th>
            <th className="border-b border-gray-200 p-2">Adult Tickets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b border-gray-200 p-2">Departure flight</td>
            <td className="border-b border-gray-200 p-2">
              24 or more hours before departure
            </td>
            <td className="border-b border-gray-200 p-2">$330.00</td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 p-2">
              Within 24 hours before departure
            </td>
            <td className="border-b border-gray-200 p-2">$330.00</td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 p-2">Return flight</td>
            <td className="border-b border-gray-200 p-2">
              24 or more hours before departure
            </td>
            <td className="border-b border-gray-200 p-2">Non-refundable</td>
          </tr>
          <tr>
            <td className="border-b border-gray-200 p-2">
              Within 24 hours before departure
            </td>
            <td className="border-b border-gray-200 p-2">Non-refundable</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="mt-4">
      <strong>Additional Information</strong>: For cancellations, an additional
      $18.10 service fee will be charged by the ticket agency...
    </p>
  </div>
);
const tabs = [
  { label: "Booking Information", content: bookingInfo },
  { label: "Baggage Allowance", content: baggageAllowance },
  { label: "Cancellation Policy", content: cancellationPolicy },
];
