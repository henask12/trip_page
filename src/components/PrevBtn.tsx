import twFocusClass from "@/utils/twFocusClass";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import React, { ButtonHTMLAttributes, FC } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrevBtn: FC<Props> = ({ className = "w-10 h-10 text-lg", ...args }) => {
  return (
    <button
      className={`PrevBtn ${className} bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-6000 dark:hover:border-neutral-500 rounded-full inline-flex items-center justify-center hover:border-neutral-300 ${twFocusClass()}`}
      {...args}
    >
      {/* <i className="chevron-left"></i> */}
      <ChevronLeftIcon className="h-6 w-6 text-neutral-900 dark:text-neutral-200" />

    </button>
  );
};

export default PrevBtn;
