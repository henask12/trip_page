import React, { useState, useEffect } from 'react';
import PrevBtn from './PrevBtn';
import NextBtn from './NextBtn';

interface DateRange {
  range: string;
  price?: string;
}

interface DateTabsProps {
  dateRanges: DateRange[];
}

// Function to determine ITEMS_PER_PAGE based on screen width
const getItemsPerPage = (width: number): number => {
  if (width <= 600) return 3; 
  if(width <= 1100 && width >600) return 5; 
  return 7;
};

const DateTabs: React.FC<DateTabsProps> = ({ dateRanges }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (dateRanges.length > 0) {
      const middleIndex = Math.floor(dateRanges.length / 2);
      setSelectedIndex(middleIndex);
    }
  }, [dateRanges]);

  const getStartIndex = () => {
    const middleIndex = Math.floor(itemsPerPage / 2);
    if (selectedIndex < middleIndex) {
      return 0;
    } else if (selectedIndex > dateRanges.length - middleIndex - 1) {
      return dateRanges.length - itemsPerPage;
    } else {
      return selectedIndex - middleIndex;
    }
  };

  const getVisibleRanges = () => {
    const startIndex = getStartIndex();
    return dateRanges.slice(startIndex, startIndex + itemsPerPage);
  };

  const handleNext = () => {
    setSelectedIndex((prevIndex) => Math.min(prevIndex + 1, dateRanges.length - 1));
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
  };

  const visibleRanges = getVisibleRanges();
  const startIndex = getStartIndex();

  return (
    <div className="flex items-center overflow-hidden pt-4 justify-center">
      <PrevBtn
        onClick={handlePrev}
        disabled={selectedIndex === 0}
      />
      <div className="flex items-center">
        {visibleRanges.map((date, index) => {
          const globalIndex = (startIndex + index) % dateRanges.length;
          return (
            <React.Fragment key={index}>
              <div className="self-center border-r border-slate-400 px-2 dark:border-slate-700 h-8"></div>
              <div
                className={`flex flex-col items-center px-4 py-2 cursor-pointer ${
                  globalIndex === selectedIndex ? 'border-b-2 border-blue-500' : ''
                }`}
                onClick={() => handleSelect(globalIndex)}
              >
                <span>{date.range}</span>
                <span className="mt-1 text-gray-500">{date.price || 'View'}</span>
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <NextBtn
        onClick={handleNext}
        disabled={selectedIndex === dateRanges.length - 1}
      />
    </div>
  );
};

export default DateTabs;
