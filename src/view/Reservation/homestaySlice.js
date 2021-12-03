import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import homestayApi from './homestayApi';


export const fetchAsyncCity = createAsyncThunk("location/fetchAsyncCity", async (location) => {
  const response = await homestayApi.get(`?${location}`);
  return response.data;
});

const initialState = {
  location: {}
}

const locationSlice = createSlice({
  name: "location",
  reducers: {
    removeSelectedLocation: (state) => {
      state.selectLocation = {};
    }
  },
  extraReducers: {
    [fetchAsyncCity.pending]: () => {
      console.log("pending");
    },
    [fetchAsyncCity.fulfilled]: (state, {payload}) => {
      console.log("Fetched successfully");
      return {...state, location: payload};
    },
    [fetchAsyncCity.rejected]: () => {
      console.log("Rejected");
    }
  }
})

export const { removeSelectedLocation } = locationSlice.actions;
export const getSelectedLocation = (state) => state.location.selectLocation;
export default locationSlice.reducers;