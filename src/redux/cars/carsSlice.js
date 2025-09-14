import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://car-rental-api.goit.global';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (params = {}, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/cars`, {
        params: {
          limit: 25, 
          ...params
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch cars');
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchCarById',
  async (carId, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/cars/${carId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch car');
    }
  }
);

export const fetchCarBrands = createAsyncThunk(
  'cars/fetchCarBrands',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/brands`);
      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch brands');
    }
  }
);

const initialState = {
  items: [],
  allItems: [],
  selectedCar: null,
  brands: [],
  isLoading: false,
  error: null,
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.cars || [];
        state.allItems = action.payload.cars || [];
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchCarById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(fetchCarBrands.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCarBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchCarBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default carsSlice.reducer;