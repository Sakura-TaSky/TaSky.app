import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  section: null,
  sectionErrorMessage: null,
  sectionLoading: null,
  sectionResMessage: null,
};

const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setSectionErrorMessage: (state, action) => {
      state.sectionErrorMessage = action.payload;
    },
    setSectionLoading: (state, action) => {
      state.sectionLoading = action.payload;
    },
    setSectionResMessage: (state, action) => {
      state.sectionResMessage = action.payload;
    },
  },
});

export const {
  setSection,
  setSectionErrorMessage,
  setSectionLoading,
  setSectionResMessage,
} = sectionSlice.actions;

export default sectionSlice.reducer;
