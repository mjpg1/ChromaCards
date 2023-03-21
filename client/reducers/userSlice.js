import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
  },
});

export const { setUser } = userSlice.actions;

export const getAndSetUser = () => {
  return async (dispatch) => {
    const currentUser = await userService.getUser();
    if (currentUser) dispatch(setUser(currentUser));
  };
};

export const loginAndSetUser = (idToken) => {
  return async (dispatch) => {
    try {
      const newUser = await userService.loginUser(idToken);
      dispatch(setUser(newUser));
    } catch (err) {
      console.log(err);
    }
  };
};

export const logoutAndSetUser = () => {
  return async (dispatch) => {
    try {
      await userService.logoutUser();
      dispatch(setUser(null));
    } catch (err) {
      console.log(err);
    }
  };
};

export default userSlice.reducer;
