import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentTo: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "mail",
  initialState,
  reducers: {
    mailSentStart: (state) => {
      state.loading = true;
    },
    mailSentSuccess: (state, action) => {
      state.sentTo = action.payload;
      state.loading = false;
      state.error = null;
    },
    mailSentFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {mailSentStart, mailSentSuccess, mailSentFailure } = userSlice.actions;

export default userSlice.reducer;
