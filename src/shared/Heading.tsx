import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { BeakerIcon } from "@heroicons/react/24/solid";
import React, { HTMLAttributes, ReactNode } from "react";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string;
  desc?: ReactNode;
  isCenter?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  children,
  desc = "",
  className = "mb-10 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  ...args
}) => {
  if (typeof desc !== "string") {
    return null;
  }

  // const items = desc.split(",").map((item) => item.trim());
  const items = desc
  .split(",")
  .map((item) => item.trim())
  .filter((item) => item.length > 0);

  const getIconForItem = (item: string) => {
    if (item.toLowerCase().includes("price match")) {
      return (
        <InformationCircleIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      );
    }
    if (item.toLowerCase().includes("guarantee")) {
      return (
        <CheckCircleIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      );
    }
    return (
      <BeakerIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
    );
  };

  return (
    <div className={`nc-Section-Heading relative ${className}`}>
      <div
        className={
          isCenter ? "text-center w-full max-w-2xl mx-auto mb-4" : "max-w-2xl"
        }
      >
        <h2 className={`text-3xl md:text-4xl font-semibold`} {...args}>
          {children}
        </h2>
        <div className="flex items-center space-x-4 overflow-x-auto">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {getIconForItem(item)}
              <span className="font-normal text-base sm:text-lg text-neutral-500 dark:text-neutral-400 border-b border-dashed border-neutral-300 dark:border-neutral-600 pb-1">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Heading;
