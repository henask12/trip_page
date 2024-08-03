"use client";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";

interface CategoryItem {
  title: string;
  price?: string;
}

interface Category {
  name: string;
  items: CategoryItem[];
} 
interface CategoriesProps {
  onFilterChange: (filter: string | null) => void;
}
const categories: Category[] = [
  {
    name: "NonStop First",
    items: [{ title: "NonStop First", price: "$120" }],
  },
  {
    name: "Lowest Price",
    items: [{ title: "Lowest Price", price: "$120" }],
  },
  {
    name: "Shortest Duration",
    items: [{ title: "Shortest Duration", price: "$157" }],
  },
  {
    name: "Sort By",
    items: [
      { title: "Departure (Earliest)", price: "$120" },
      { title: "Departure (Latest)", price: "$140" },
      { title: "Arrival (Earliest)", price: "$130" },
      { title: "Arrival (Latest)", price: "$150" },
    ],
  },
];

const Categories: React.FC<CategoriesProps> = ({onFilterChange}) => {
  const [activeTab, setActiveTab] = useState<string>(categories[0].name);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [selectedSortBy, setSelectedSortBy] = useState<CategoryItem | null>(null);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDate = now.toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentDateTime(formattedDate);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleTabClick = (name: string) => {
    setActiveTab(name);
    if (name === "Sort By") {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(false);
    }
  };

  const handleItemClick = (item: CategoryItem) => {
    setSelectedSortBy(item);
    setActiveTab("Sort By");
    setDropdownOpen(false);
    onFilterChange(item.title);
  };

  return (
    <div className="hidden lg:block w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="bg-blue-800 p-4 text-white rounded-t-lg flex justify-between">
        <div className="font-bold text-lg">1. Departing to Bangkok</div>
        <div className="text-sm flex items-center space-x-2">
          <span>*Last updated: {currentDateTime}</span>
        </div>
      </div>

      <div className="flex border-b border-gray-300 text-center">
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <div
              className={`flex-1 p-4 cursor-pointer ${
                activeTab === category.name
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => handleTabClick(category.name)}
            >
              {category.name === "Sort By" ? (
                <div className="flex items-center justify-center">
                  <div className="font-medium">
                    {selectedSortBy ? selectedSortBy.title : category.name}
                  </div>
                  <div className="ml-2">
                    {dropdownOpen ? (
                      <ChevronUpIcon className="h-5 w-5" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5" />
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-sm">{category.items[0].price}</div>
                </>
              )}
            </div>
            {index < categories.length - 1 && (
              <div className="self-center border-r border-slate-400 px-2 dark:border-slate-700 h-8"></div>
            )}
          </React.Fragment>
        ))}
      </div>

      {activeTab === "Sort By" && dropdownOpen && (
        <div className="relative">
          <div className="absolute right-0 bg-white rounded-md shadow-lg mt-1 overflow-hidden z-10">
            {categories
              .find((category) => category.name === "Sort By")
              ?.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between p-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <span>{item.title}</span>
                  <span className="text-blue-500">{item.price}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
