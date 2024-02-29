import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  isLoading: false,
  error: null,
};
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setJobs: (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.jobs = action.payload;
    },
    deleteJob: (state, action) => {
      // silecegimiz elemanın idsi üzerinden sırasını bul
      const index = state.jobs.findIndex((i) => i.id === action.payload);

      // elemanı diziden kaldır
      state.jobs.splice(index, 1);
    },
    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },
  },
});
export const { setError, setJobs, setLoading, deleteJob, createJob } =
  jobSlice.actions;

export default jobSlice.reducer;
