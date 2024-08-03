import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FlightSection {
  origin: string;
  destination: string;
  flightDates: [Date | null, Date | null];
}

interface FlightSearchState {
  flightSections: FlightSection[];
  guestAdults: number;
  guestChildren: number;
  guestInfants: number;
  tripType: string;
  class: string;
}

const initialState: FlightSearchState = {
  flightSections: [{ origin: '', destination: '', flightDates: [null, null] }],
  guestAdults: 1,
  guestChildren: 0,
  guestInfants: 0,
  tripType: '',
  class: '',
};

const flightSearchSlice = createSlice({
  name: 'flightSearch',
  initialState,
  reducers: {
    setFlightSearchState: (state, action: PayloadAction<FlightSearchState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setFlightSearchState } = flightSearchSlice.actions;
export default flightSearchSlice.reducer;
