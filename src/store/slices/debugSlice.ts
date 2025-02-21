import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const debugSlice = createSlice({
  name: 'debug',
  initialState: {isContentVisible: false, lastLocation: {x: 0, y: 0}},
  reducers: {
    showContentDebug: state => {
      state.isContentVisible = true;
    },
    hideContentDebug: state => {
      state.isContentVisible = false;
    },
    updateLastLocation: (
      state,
      action: PayloadAction<{x: number; y: number}>,
    ) => {
      state.lastLocation = action.payload;
    },
  },
});

export const {showContentDebug, hideContentDebug, updateLastLocation} =
  debugSlice.actions;
export default debugSlice.reducer;
