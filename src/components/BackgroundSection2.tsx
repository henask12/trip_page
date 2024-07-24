import React, { FC } from "react";

export interface BackgroundSectionProps2 {
  className?: string;
  children?: React.ReactNode;
}

const BackgroundSection2: FC<BackgroundSectionProps2> = ({
  className = "bg-neutral-100 dark:bg-black dark:bg-opacity-20 ",
  children,
}) => {
  return (
    <div
      className={`nc-BackgroundSection absolute inset-y-0 w-screen xl:max-w-[1280px]  left-1/2 transform -translate-x-1/2 xl:rounded-[15px] z-0 ${className}`}
      data-nc-id="BackgroundSection"
    >
      {children}
    </div>
  );
};

export default BackgroundSection2;
