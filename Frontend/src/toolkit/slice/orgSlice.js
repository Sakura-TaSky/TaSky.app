import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  org: null,
  orgLoading: null,
  orgErrorMessage: null,
  orgResMessage: null,
};

const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: {
    setOrg: (state, action) => {
      state.org = action.payload;
    },
    setOrgLoading: (state, action) => {
      state.orgLoading = action.payload;
    },
    setOrgErrorMessage: (state, action) => {
      state.orgErrorMessage = action.payload;
    },
    setOrgResMessage: (state, action) => {
      state.orgResMessage = action.payload;
    },
  },
});

export const { setOrg, setOrgErrorMessage, setOrgLoading, setOrgResMessage } =
  orgSlice.actions;

export default orgSlice.reducer;
