import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Flight {
  id: string;
  origin: string;
  destination: string;
  airlines: {
    name: string;
  };
}

interface FlightSearchResponseState {
  flights: Flight[];
  selectedDepartureFlightId: string | null;
}

const initialState: FlightSearchResponseState = {
  flights: [],
  selectedDepartureFlightId: null,
};

const flightSearchResponseSlice = createSlice({
  name: 'flightSearchResponse',
  initialState,
  reducers: {
    setFlightData(state, action: PayloadAction<Flight[]>) {
      state.flights = action.payload;
    },
    setSelectedDepartureFlight(state, action: PayloadAction<string | null>) {
      state.selectedDepartureFlightId = action.payload;
    },
  },
});

export const { setFlightData, setSelectedDepartureFlight } = flightSearchResponseSlice.actions;
export default flightSearchResponseSlice.reducer;
