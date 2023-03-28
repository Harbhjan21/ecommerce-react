import { configureStore, createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "authantication",
  initialState: { auth: false },
  reducers: {
    login(state) {
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
  },
});

const store = configureStore({
  reducer: { auth: authslice.reducer },
});
export const authaction = authslice.actions;

export default store;
