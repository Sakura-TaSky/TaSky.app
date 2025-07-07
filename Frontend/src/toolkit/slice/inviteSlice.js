import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  invite: null,
  inviteLoading: null,
  inviteErrorMessage: null,
};

const inviteSlice = createSlice({
  name: 'invite',
  initialState,
  reducers: {
    setInvite: (state, action) => {
      state.invite = action.payload;
    },
    setInviteLoading: (state, action) => {
      state.inviteLoading = action.payload;
    },
    setInviteErrorMessage: (state, action) => {
      state.inviteErrorMessage = action.payload;
    },
  },
});

export const { setInvite, setInviteErrorMessage, setInviteLoading } =
  inviteSlice.actions;

export default inviteSlice.reducer;
