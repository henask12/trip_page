export interface GuestsObject {
  guestAdults?: number;
  guestChildren?: number;
  guestInfants?: number;
}

export type StaySearchFormFields = "location" | "guests" | "dates";

export interface PropertyType {
  name: string;
  description: string;
  checked: boolean;
}

export interface FlightCardProps {
  className?: string;
  isSheetOpen: boolean;
  setIsSheetOpen: () => void;
  onCloseSheet: () => void;
  onSelect?: (id: string) => void;
  data: {
    id: string;
    price?: string;
    stops?: string;
    airlines: {
      logo: string;
      name: string;
    };
    flightNumber: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    transitTime?: string;
    amenities: {
      wifi: boolean;
      usb: boolean;
      meals: boolean;
      entertainment: boolean;
    };
    co2Emissions?: string;
    flightClass?: string;
    duration?: string;
  };
}

export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];
