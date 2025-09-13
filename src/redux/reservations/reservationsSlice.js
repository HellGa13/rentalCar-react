import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    addReservation: (state, action) => {
      state.items.push({
        ...action.payload,
        reservationDate: action.payload.reservationDate ?? null,
        id: nanoid(),
      });
    },
  },
});

export const reservationsReducer = reservationsSlice.reducer;
export const { addReservation } = reservationsSlice.actions;