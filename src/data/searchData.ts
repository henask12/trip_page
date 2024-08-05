export interface FlightSection {
  origin: string;
  destination: string;
  flightDates: [Date | null, Date | null];
}

export interface FormValues {
  flightSections: FlightSection[];
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
  tripType: string;
  class: string;
}

export const oneWayEconomy: FormValues = {
  flightSections: [
    {
      origin: "New York",
      destination: "London",
      flightDates: [new Date("2024-08-15T00:00:00Z"), null],
    },
  ],
  guestAdults: 2,
  guestChildren: 1,
  guestInfants: 0,
  tripType: "One-Way",
  class: "Economy",
};

export const roundTripBusiness: FormValues = {
  flightSections: [
    {
      origin: "LAX",
      destination: "ADD",
      flightDates: [
        new Date("2024-09-01T00:00:00Z"),
        new Date("2024-09-15T00:00:00Z"),
      ],
    },
  ],
  guestAdults: 1,
  guestChildren: 0,
  guestInfants: 0,
  tripType: "Round-Trip",
  class: "Business",
};

export const multiCityEconomy: FormValues = {
  flightSections: [
    {
      origin: "Tokyo",
      destination: "Sydney",
      flightDates: [new Date("2024-10-01T00:00:00Z"), null],
    },
    {
      origin: "Sydney",
      destination: "New York",
      flightDates: [new Date("2024-10-15T00:00:00Z"), null],
    },
  ],
  guestAdults: 2,
  guestChildren: 2,
  guestInfants: 1,
  tripType: "Multi-City",
  class: "Economy",
};

export const oneWayBusinessSpecificDates: FormValues = {
  flightSections: [
    {
      origin: "San Francisco",
      destination: "Berlin",
      flightDates: [new Date("2024-11-01T00:00:00Z"), null],
    },
  ],
  guestAdults: 1,
  guestChildren: 1,
  guestInfants: 1,
  tripType: "One-Way",
  class: "Business",
};
