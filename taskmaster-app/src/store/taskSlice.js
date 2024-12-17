import { createSlice } from "@reduxjs/toolkit";
export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    singleTask:[],
    isLoading: false,
    error: null,
  },
  reducers: {
    setStoreTasks: (state, action) => {
      state.tasks = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setSingleTask: (state, action) => {
        const {id}=action.payload;

    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateTaskSubtask: (state, action) => {
      const { id, title, content } = action.payload;
      const subTaskIndex = state.slides.findIndex((subtask) => subtask.id === id);
      if (subTaskIndex !== -1) {
        state.slides[subTaskIndex] = {
          ...state.tasks[subTaskIndex],
          title,
          content,
        };
      }
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setStoreTasks, setLoading, setError } = taskSlice.actions;
export default taskSlice.reducer;
