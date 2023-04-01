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
const profileslice = createSlice({
  name: "credentials",
  initialState: { username: "", email: "", PhoneNo: "" },
  reducers: {
    setprofile(state, action) {
      console.log(action.payload);
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.PhoneNo = action.payload.PhoneNo;
    },
  },
});

const store = configureStore({
  reducer: { auth: authslice.reducer, profile: profileslice.reducer },
});
export const authaction = authslice.actions;
export const profileaction = profileslice.actions;

export default store;
