import React, { FC } from "react";
import HeroSearchForm from "./HeroSearchForm";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero flex flex-col-reverse lg:flex-col relative ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center w-full">
        <div className="flex-shrink-0 lg:w-full flex flex-col items-center mb-2 space-y-8 sm:space-y-10 pb-14 lg:pb-60 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-bold text-4xl  !leading-[114%]  text-white p-4 sm:p-4 lg:p-4">
          Your Trip Starts Here
          </h2>
          
        </div>
      </div>

      <div className="hidden lg:block z-10 mb-5 lg:mb-6 lg:-mt-40 w-full">
        <HeroSearchForm />
      </div>
    </div>
  );
};

export default SectionHero;
