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
export type TripType = 'one-way' | 'round-trip' | 'multi-city';
export interface FlightCardProps {
  className?: string;
  isSheetOpen: boolean;
  setIsSheetOpen: () => void;
  onCloseSheet: () => void;
  onSelect?: () => void;
  tripType: TripType; // Define tripType to manage different scenarios
  data: FlightSegment | RoundTripData | MultiCityData;
}
export interface FlightSegment {
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
}
// Define the structure for round-trip flights
export interface RoundTripData {
  departingFlight: FlightSegment;
  returningFlight: FlightSegment;
}
// Define the structure for multi-city flights
export interface MultiCityData {
  legs: FlightSegment[];
}

type TripData = FlightSegment | RoundTripData | MultiCityData;

export function isRoundTripData(data: TripData): data is RoundTripData {
  return (data as RoundTripData).departingFlight !== undefined &&
         (data as RoundTripData).returningFlight !== undefined;
}

export function isMultiCityData(data: TripData): data is MultiCityData {
  return (data as MultiCityData).legs !== undefined;
}

export function isFlightSegment(data: TripData): data is FlightSegment {
  return (data as FlightSegment).id !== undefined;
}
export interface ClassOfProperties extends PropertyType {}

export type DateRage = [Date | null, Date | null];
