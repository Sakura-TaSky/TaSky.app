import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  team: null,
  teamErrorMessage: null,
  teamLoading: null,
  teamResMessage: null,
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setTeamErrorMessage: (state, action) => {
      state.teamErrorMessage = action.payload;
    },
    setTeamLoading: (state, action) => {
      state.teamLoading = action.payload;
    },
    setTeamResMessage: (state, action) => {
      state.teamResMessage = action.payload;
    },
  },
});

export const {
  setTeam,
  setTeamErrorMessage,
  setTeamLoading,
  setTeamResMessage,
} = teamSlice.actions;

export default teamSlice.reducer;
