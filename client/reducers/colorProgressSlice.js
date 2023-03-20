import { createSlice } from '@reduxjs/toolkit';
import colors from '../../colors';

// convert 2D array of color names and codes into array of objects with progress set to 0 (when no user signed in)
const initialState = colors.map(([color, code]) => ({
  color,
  code,
  progress: 0,
}));

const colorProgressSlice = createSlice({
  name: 'colorProgress',
  initialState,
  reducers: {
    setColorProgress: (state, action) => {
      const userProgress = action.payload;
      return state.map((colorInfo) => {
        const { color, progress } = colorInfo;
        return color in userProgress
          ? { ...colorInfo, progress: userProgress[color] }
          : colorInfo;
      });
    },
  },
});

export const { setColorProgress } = colorProgressSlice.actions;
export default colorProgressSlice.reducer;
