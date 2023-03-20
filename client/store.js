import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import colorProgressReducer from './reducers/colorProgressSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    colorProgress: colorProgressReducer,
  },
});
