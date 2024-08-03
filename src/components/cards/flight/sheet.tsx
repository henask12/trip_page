import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

type Tab = {
  label: string;
  content: React.ReactNode;
};

type SheetProps = {
  open: boolean;
  onClose: () => void;
  side?: 'top' | 'bottom' | 'left' | 'right';
  title: string;
  tabs: Tab[];
};

const sheetPositionClasses = {
  top: 'top-0 inset-x-0 border-b',
  bottom: 'bottom-0 inset-x-0 border-t',
  left: 'left-0 inset-y-0 w-2/4 border-r',
  right: 'right-0 inset-y-0 w-2/4 border-l',
};

export const Sheet: React.FC<SheetProps> = ({ open, onClose, side = 'right', title, tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open, onClose]);

  return (
    <>
      {open && (
        <>
          <div
            className={clsx(
              'fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity z-40',
              'opacity-100 transition-opacity duration-300'
            )}
            aria-hidden="true"
          />
          <div
            ref={sheetRef}
            className={clsx(
              'fixed z-50 p-6 bg-white shadow-lg transition-transform ease-in-out',
              sheetPositionClasses[side],
              open ? 'translate-x-0' : (side === 'right' ? 'translate-x-full' : 'translate-x-[-100%]'),
              'duration-300'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
              aria-label="Close"
            >
              <span className="text-lg font-bold">&times;</span>
            </button>
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="mt-4">
              <div className="flex border-b">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={clsx(
                      'flex-1 py-2 px-4 text-center',
                      index === activeTab ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-600'
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="mt-4 h-64 overflow-auto">
                {tabs[activeTab]?.content}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
