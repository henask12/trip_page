"use client";
import { useState } from "react";
import CheckOutPagePageMain from "./component/Details";
import StartRating from "@/components/StartRating";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface StepState {
  stepsItems: string[];
  currentStep: number;
}

const Details: React.FC = () => <div>Details Component</div>;
const PriceDetails: React.FC = () => <div>Price Details Component</div>;
const TicketPolicies: React.FC = () => <div>Ticket Policies Component</div>;
const SectionHero: React.FC = () => <div>Section Hero Component</div>;

const includes_demo = [
  { name: "Free cancellation up to 48 hours before pick-up" },
  { name: "Collision Damage Waiver with $214 deductible" },
  { name: "Theft Protection with $19,999 excess" },
];

const Stepper: React.FC = () => {
  const [steps, setStep] = useState<StepState>({
    stepsItems: [
      "Personal Infromation",
      "Top Sellers",
      "Select Add-ons",
      "Pay",
    ],
    currentStep: 1,
  });

  const incrementStep = () => {
    setStep((prev) => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, steps.stepsItems.length),
    }));
  };

  const renderSidebarDetail = () => {
    return (
      <div className="listingSection__wrap lg:shadow-xl">
        <span className="text-2xl font-semibold block">
          Pick up and drop off
        </span>
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
                Saint Petersburg City Center
              </span>
            </div>
            <div className="flex flex-col space-y-2">
              <span className=" text-neutral-500 dark:text-neutral-400">
                Monday, August 16 · 10:00
              </span>
              <span className=" font-semibold">
                Saint Petersburg City Center
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
        <div className="grid container rounded-2xl shadow-lg border bg-white px-2 grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
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
  const renderCurrentStepComponent = () => {
    switch (steps.currentStep) {
      case 1:
        return <CheckOutPagePageMain />;
      case 2:
        return renderSidebarDetail();
      case 3:
        return TicketPolicy();
      case 4:
        return <SectionHero />;
      default:
        return null;
    }
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <h2 className="text-lg text-neutral-900 dark:text-neutral-100 font-bold flex-grow">
          Price Details
        </h2>

        <div className="flex flex-col text-sm sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-72">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                All prices are in US dollars
              </span>

              <div className="flex mt-2 font-medium justify-between text-neutral-6000 dark:text-neutral-300">
                <span> Tickets(1 Adult, 1 Child, 1 Infant)</span>
                <span>$1,777.20</span>
              </div>
            </div>
            
            <div className="w-full mt-4 border-b border-neutral-200  dark:border-neutral-700"></div>
            {/* <StartRating /> */}
          </div>
        </div>
        <div className="flex flex-col text-sm space-y-1">
          <h3 className="text-xl font-semibold">Baggage</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Personal Item</span>
            <span>Check with airline
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Carry-on Baggage</span>
            <span>Some passengers
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Checked Baggage</span>
            <span>Free
            </span>
          </div>

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold mt-4">
            <span>Total</span>
            <span className="text-custom-blue">$1,777.20</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-10 pt-14 items-center min-h-screen justify-center">
      {/* Stepper Navigation */}
      <div className="w-full container ">
        <ul
          aria-label="Steps"
          className="items-center text-gray-600 font-medium flex"
        >
          {steps.stepsItems.map((item, idx) => {
            const isCurrent = steps.currentStep === idx + 1;
            const isCompleted = steps.currentStep > idx + 1;
            const isLast = idx + 1 === steps.stepsItems.length;

            return (
              <li
                key={idx}
                aria-current={isCurrent ? "step" : false}
                className="flex flex-col flex-1 gap-x-0"
              >
                <div className="flex items-center flex-row flex-1">
                  <hr
                    className={`w-full border block ${
                      idx === 0
                        ? "border-none"
                        : isCompleted || isCurrent
                        ? "border-indigo-600"
                        : ""
                    }`}
                  />
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex-none flex items-center justify-center ${
                      isCompleted
                        ? "bg-indigo-600 border-indigo-600"
                        : isCurrent
                        ? "border-indigo-600"
                        : ""
                    }`}
                  >
                    {isCompleted ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    ) : (
                      <span
                        className={`w-2.5 h-2.5 rounded-full bg-indigo-600 ${
                          !isCurrent ? "hidden" : ""
                        }`}
                      />
                    )}
                  </div>
                  <hr
                    className={`border w-full h-auto ${
                      isLast
                        ? "border-none"
                        : isCompleted
                        ? "border-indigo-600"
                        : ""
                    }`}
                  />
                </div>
                <div className="hidden sm:flex justify-center items-center mt-3 h-auto">
                  <h3
                    className={`text-sm ${isCurrent ? "text-indigo-600" : ""}`}
                  >
                    {item}
                  </h3>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Step Content */}

      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-4/5 xl:w-3/4 lg:pr-10">
          {" "}
          {renderCurrentStepComponent()}
        </div>
        <div className="hidden lg:block flex-grow lg:sticky  lg:top-4 lg:self-start">
          {renderSidebar()}
        </div>
      </main>

      {/* Next Button */}
      <button
        onClick={incrementStep}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Stepper;
