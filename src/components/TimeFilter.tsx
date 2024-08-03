import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the styles for Slider

interface TimeFilterProps {
  catTimes: {
    Departure: [number, number];
    Arrival: [number, number];
  };
  setCatTimes: React.Dispatch<React.SetStateAction<{
    Departure: [number, number];
    Arrival: [number, number];
  }>>;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ catTimes, setCatTimes }) => {
  return (
    <div className="rounded-xl p-3 space-y-8 focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-900 ring-white ring-opacity-60">
      <span className="font-medium flex items-center justify-between">Times</span>
      <hr />
      <div className="space-y-3">
        <div className="flex space-x-2">
          <i className="text-lg las la-plane-departure"></i>
          <span className="text-xs">Departure time:</span>
          <span className="text-xs text-primary-500 dark:text-primary-400">
            {catTimes.Departure[0]}:00 - {catTimes.Departure[1]}:00
          </span>
        </div>
        <Slider
          range
          min={0}
          max={24}
          defaultValue={catTimes.Departure}
          onChange={(val) =>
            setCatTimes((prevCatTimes) => ({
              ...prevCatTimes,
              Departure: val as [number, number],
            }))
          }
          allowCross={false}
        />
      </div>
      <div className="space-y-3">
        <div className="flex space-x-2">
          <i className="text-lg las la-plane-arrival"></i>
          <span className="text-xs">Arrival time:</span>
          <span className="text-xs text-primary-500 dark:text-primary-400">
            {catTimes.Arrival[0]}:00 - {catTimes.Arrival[1]}:00
          </span>
        </div>
        <Slider
          range
          min={0}
          max={24}
          defaultValue={catTimes.Arrival}
          onChange={(val) =>
            setCatTimes((prevCatTimes) => ({
              ...prevCatTimes,
              Arrival: val as [number, number],
            }))
          }
          allowCross={false}
        />
      </div>
    </div>
  );
};

export default TimeFilter;
