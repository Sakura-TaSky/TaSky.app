import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  authLoading: null,
  errorMessage: null,
  resMessage: null,
  appLoading: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    logoutUser: state => {
      state.user = null;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setResMessage: (state, action) => {
      state.resMessage = action.payload;
    },
    setAppLoading: (state, action) => {
      state.appLoading = action.payload;
    },
    updateUserProfile(state, action) {
      if (state.user) {
        state.user.userName = action.payload.userName ?? state.user.userName;
        state.user.profilePhoto =
          action.payload.profilePhoto ?? state.user.profilePhoto;
      }
    },
  },
});

export const {
  setUser,
  setAuthLoading,
  logoutUser,
  setErrorMessage,
  setResMessage,
  setAppLoading,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
