import React, { FC, useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";
import { FieldProps } from "formik";

export interface NcInputNumberProps extends FieldProps {
  className?: string;
  min?: number;
  max?: number;
  label?: string;
  desc?: string;
}

const NcInputNumber: FC<NcInputNumberProps> = ({
  field, // Formik field props
  form,  // Formik form props
  className = "w-full",
  min = 0,
  max,
  label,
  desc,
}) => {
  const [value, setValue] = useState(field.value);

  useEffect(() => {
    setValue(field.value);
  }, [field.value]);

  const handleClickDecrement = () => {
    if (min >= value) return;
    const newValue = value - 1;
    setValue(newValue);
    form.setFieldValue(field.name, newValue);
  };

  const handleClickIncrement = () => {
    if (max && max <= value) return;
    const newValue = value + 1;
    setValue(newValue);
    form.setFieldValue(field.name, newValue);
  };

  const renderLabel = () => {
    return (
      <div className="flex flex-col">
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </span>
        {desc && (
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
            {desc}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
      data-nc-id="NcInputNumber"
    >
      {label && renderLabel()}

      <div className="flex items-center justify-between w-28">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickDecrement}
          disabled={min >= value}
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <span>{value}</span>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
          type="button"
          onClick={handleClickIncrement}
          disabled={max ? max <= value : false}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NcInputNumber;
