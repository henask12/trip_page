import React, { useState } from "react";
import Checkbox from "@/shared/Checkbox";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import ButtonThird from "@/shared/ButtonThird";

interface FilterItem {
  name: string;
  price?: string;
}

interface FilterSectionProps {
  title: string;
  items: FilterItem[];
  selectedItems: string[];
  onChange: (name: string, checked: boolean) => void;
  onClear: () => void;
  onSelectAll?: () => void;
  allSelected?: boolean;
  isExpandable?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selectedItems,
  onChange,
  onClear,
  onSelectAll,
  allSelected,
  isExpandable = false,
}) => {
  const [showMore, setShowMore] = useState(false);
  const itemsToShow = showMore ? items : items.slice(0, 4);
  const [visible, setVisible] = useState<boolean>(!isExpandable);

  return (
    <div className="overflow-hidden w-96">
      <div className="relative flex flex-col px-5 py-6 space-y-3">
        <div
          className="rounded-md"
          onClick={() => isExpandable && setVisible(!visible)}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="font-medium">{title}</span>
              {isExpandable && (
                <span className="text-gray-600 text-sm">Any Stop</span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {selectedItems.length > 0 && (
                <button
                  className="cursor-pointer text-gray-600 hover:text-blue-500 hover:unde"
                  onClick={onClear}
                >
                  Clear
                </button>
              )}
              {isExpandable && (
                <span className="text-gray-600">
                  {visible ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        {visible && (
          <>
            <hr />
            {onSelectAll && (
              <div
                className={`cursor-pointer p-2 rounded-md ${
                  allSelected
                    ? "border border-blue-500"
                    : "border border-neutral-200 dark:border-neutral-700"
                }`}
                onClick={onSelectAll}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">All {title}</span>
                </div>
              </div>
            )}
            {itemsToShow.map((item) => (
              <div
                key={item.name}
                className={`flex justify-between items-center rounded-md cursor-pointer ${
                  selectedItems.includes(item.name)
                    ? "text-blue-500"
                    : "text-gray-800"
                } hover:bg-gray-100 dark:hover:bg-gray-800`}
              >
                <Checkbox
                  name={item.name}
                  label={item.name}
                  checked={selectedItems.includes(item.name)}
                  onChange={(checked) => onChange(item.name, checked)}
                  className="mr-2"
                />
                {item.price && (
                  <span className="text-gray-600">{item.price}</span>
                )}
              </div>
            ))}
            {items.length > 4 && (
              <div className="flex justify-center mt-4">
                <ButtonThird
                  className="flex items-center text-blue-500 hover:underline"
                  onClick={() => setShowMore((prev) => !prev)}
                >
                  <span className="flex items-center">
                    {showMore ? "Show Less" : "Show More"}
                    {showMore ? (
                      <ChevronUpIcon className="h-5 w-5 ml-2" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 ml-2" />
                    )}
                  </span>
                </ButtonThird>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
