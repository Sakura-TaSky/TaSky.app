import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: null,
  projectLoading: null,
  projectErrorMessage: null,
  projectResMessage: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload;
    },
    setProjectLoading: (state, action) => {
      state.projectLoading = action.payload;
    },
    setProjectErrorMessage: (state, action) => {
      state.projectErrorMessage = action.payload;
    },
    setProjectResMessage: (state, action) => {
      state.projectResMessage = action.payload;
    },
  },
});

export const {
  setProject,
  setProjectErrorMessage,
  setProjectLoading,
  setProjectResMessage,
} = projectSlice.actions;

export default projectSlice.reducer;
