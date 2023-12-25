import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allInterns: [],
  error: null,
  loading: false,
};

const internSlice = createSlice({
  name: "interns",
  initialState,
  reducers: {
    internStart: (state) => {
      state.loading = true;
    },
    internSuccess: (state, action) => {
      state.allInterns = action.payload;
      state.loading = false;
      state.error = null;
    },
    internFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
  },
});

export const { internStart, internSuccess, internFailure } =
  internSlice.actions;

export default internSlice.reducer;
