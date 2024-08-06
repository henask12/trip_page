import { configureStore } from '@reduxjs/toolkit';
import flightSearchReducer from '../features/flightSearch/flightSearchSlice';
import flightSearchResponseReducer from '../features/flightSearch/flightSearchResponseSlice';

export const store = configureStore({
  reducer: {
    flightSearch: flightSearchReducer,
    flightSearchResponse: flightSearchResponseReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
