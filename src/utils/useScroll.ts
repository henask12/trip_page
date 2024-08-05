import { useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';

type UseScrollHandlerProps = {
  setShowFlightInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

const useScrollHandler = ({ setShowFlightInfo }: UseScrollHandlerProps) => {
  const lastScrollYRef = useRef<number>(window.scrollY);
  const debounceRef = useRef(
    debounce((scrollY: number) => {
      const triggerPosition = 100;

      // Determine whether to show or hide flight info
      if (scrollY > triggerPosition) {
        setShowFlightInfo(true);
      } else if (scrollY === 0) {
        setShowFlightInfo(false);
      }
    }, 100) // Debounce delay
  ).current;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      debounceRef(scrollY);
      lastScrollYRef.current = scrollY; // Update last scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      debounceRef.cancel(); // Cleanup debounce on unmount
    };
  }, [debounceRef, setShowFlightInfo]);
};

export default useScrollHandler;
