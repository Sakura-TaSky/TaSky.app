import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  task: null,
  taskLoading: null,
  taskErrorMessage: null,
  taskResMessage: null,
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setTaskLoading: (state, action) => {
      state.taskLoading = action.payload;
    },
    setTaskErrorMessage: (state, action) => {
      state.taskErrorMessage = action.payload;
    },
    setTaskResMessage: (state, action) => {
      state.taskResMessage = action.payload;
    },
  },
});

export const {
  setTask,
  setTaskErrorMessage,
  setTaskLoading,
  setTaskResMessage,
} = taskSlice.actions;

export default taskSlice.reducer;
