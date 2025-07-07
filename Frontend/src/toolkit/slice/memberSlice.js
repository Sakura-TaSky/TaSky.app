import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  member: null,
  memberLoading: null,
  memberErrorMessage: null,
};

const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    setMember: (state, action) => {
      state.member = action.payload;
    },
    setMemberLoading: (state, action) => {
      state.memberLoading = action.payload;
    },
    setMemberErrorMessage: (state, action) => {
      state.memberErrorMessage = action.payload;
    },
  },
});

export const { setMember, setMemberLoading, setMemberErrorMessage } =
  memberSlice.actions;

export default memberSlice.reducer;
