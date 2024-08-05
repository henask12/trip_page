import React, { useState } from "react";
import Image from "next/image";
import { Sheet } from "./sheet";
import ButtonPrimary from "@/components/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { CheckIcon } from "@heroicons/react/24/solid";
import PrevBtn from "@/components/PrevBtn";
import NextBtn from "@/components/NextBtn";

const tabs = [
  { label: "Tab 1", content: <div className="p-4">Content for Tab 1</div> },
  { label: "Tab 2", content: <div className="p-4">Content for Tab 2</div> },
  { label: "Tab 3", content: <div className="p-4">Content for Tab 3</div> },
];
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

  const handleSelectClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsSelectedLocal(!isSelectedLocal);
    onSelect(data.id);
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
          <span className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-primary-6000" onClick={handleSheetClick}>
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="text-neutral-700 cursor-pointer dark:text-neutral-300" onClick={handleSheetClick}>
            <strong>Carry-on Baggage:</strong> {pricing.baggage.carryOn}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-primary-6000" onClick={handleSheetClick}>
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="text-neutral-700 cursor-pointer dark:text-neutral-300" onClick={handleSheetClick}>
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
          <span className="mr-4 inline-flex cursor-pointer flex-shrink-0 text-primary-6000" onClick={handleSheetClick}>
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="text-neutral-700 cursor-pointer dark:text-neutral-300" onClick={handleSheetClick}>
            <strong>Cancellation Fee:</strong>{" "}
            {pricing.fareRules.cancellationFee}
          </span>
        </div>
        <div className="flex items-center">
          <span className="mr-4 cursor-pointer inline-flex flex-shrink-0 text-primary-6000" onClick={handleSheetClick}>
            <CheckIcon className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="text-neutral-700 cursor-pointer dark:text-neutral-300" onClick={handleSheetClick}>
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
        title="Sheet with Tabs"
        tabs={tabs}
      />
    </>
  );
};

export default FlightDetail;
