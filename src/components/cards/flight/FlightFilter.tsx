"use client";

import React, { useState } from "react";
import FilterSection from "./FilterSection";
import TimeFilter from "../../TimeFilter";

const airlines = [
  { name: "Ethiopian", price: "$1258" },
  { name: "Air China", price: "$1258" },
  { name: "Air India", price: "$1258" },
  { name: "Air New Zealand", price: "$1258" },
  { name: "Asiana", price: "$1258" },
  { name: "Bangkok Airways", price: "$1258" },
  { name: "Emirates", price: "$1258" },
  { name: "Kenyan Airways", price: "$1258" },
];

const alliances = [
  { name: "Star Alliance", price: "$191" },
  { name: "Oneworld", price: "$196" },
  { name: "SkyTeam", price: "$231" },
];

const recommendations = [
  { name: "Nonstop" },
  { name: "Checked baggage included" },
  { name: "Hide low-cost airlines" },
  { name: "Student tickets" },
  { name: "Carry-on baggage included" },
  { name: "Hide codeshare flights" },
];

const stopoverCities = [
  { name: "Ethiopian", price: "$1258" },
  { name: "Air China", price: "$1258" },
  { name: "Air India", price: "$1258" },
  { name: "Air New Zealand", price: "$1258" },
  { name: "Asiana", price: "$1258" },
  { name: "Bangkok Airways", price: "$1258" },
  { name: "Emirates", price: "$1258" },
  { name: "Kenyan Airways", price: "$1258" },
];

type CatTimes = {
  Departure: [number, number];
  Arrival: [number, number];
};

const FlightFilter: React.FC = () => {
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedAlliances, setSelectedAlliances] = useState<string[]>([]);
  const [selectedStopOverCities, setSelectedStopOverCities] = useState<
    string[]
  >([]);
  const [selectedRecommendations, setSelectedRecommendations] = useState<
    string[]
  >([]);
  const [catTimes, setCatTimes] = useState<CatTimes>({
    Departure: [0, 24],
    Arrival: [0, 24],
  });

  const handleToggleItem = (
    selectedItems: string[],
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    name: string,
    checked: boolean
  ) => {
    setSelectedItems((prev) =>
      checked ? [...prev, name] : prev.filter((item) => item !== name)
    );
  };

  const handleClearSelection = (
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelectedItems([]);
  };

  const handleSelectAllAirlines = () => {
    if (selectedAirlines.length === airlines.length) {
      setSelectedAirlines([]);
    } else {
      setSelectedAirlines(airlines.map((item) => item.name));
    }
  };

  return (
    <div className="p-4">
      <FilterSection
        title="Recommended"
        items={recommendations}
        selectedItems={selectedRecommendations}
        onChange={(name, checked) =>
          handleToggleItem(
            selectedRecommendations,
            setSelectedRecommendations,
            name,
            checked
          )
        }
        onClear={() => handleClearSelection(setSelectedRecommendations)}
      />
      <hr className="border-gray-300" />

      <FilterSection
        title="Alliance"
        items={alliances}
        selectedItems={selectedAlliances}
        onChange={(name, checked) =>
          handleToggleItem(
            selectedAlliances,
            setSelectedAlliances,
            name,
            checked
          )
        }
        onClear={() => handleClearSelection(setSelectedAlliances)}
      />
      <hr className="border-gray-300" />

      <FilterSection
        title="Airlines"
        items={airlines}
        selectedItems={selectedAirlines}
        onChange={(name, checked) =>
          handleToggleItem(selectedAirlines, setSelectedAirlines, name, checked)
        }
        onClear={() => handleClearSelection(setSelectedAirlines)}
        onSelectAll={handleSelectAllAirlines}
        allSelected={selectedAirlines.length === airlines.length}
      />
      <hr className="border-gray-300" />

      <TimeFilter catTimes={catTimes} setCatTimes={setCatTimes} />
      <hr className="border-gray-300" />

      <FilterSection
        title="Stopover Cities"
        items={stopoverCities}
        selectedItems={selectedStopOverCities}
        onChange={(name, checked) =>
          handleToggleItem(
            selectedStopOverCities,
            setSelectedStopOverCities,
            name,
            checked
          )
        }
        onClear={() => handleClearSelection(setSelectedStopOverCities)}
        allSelected={selectedStopOverCities.length === airlines.length}
        isExpandable={true}
      />
    </div>
  );
};

export default FlightFilter;
