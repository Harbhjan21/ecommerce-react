import { configureStore, createSlice } from "@reduxjs/toolkit";

const authslice = createSlice({
  name: "authantication",
  initialState: { auth: false, alert: false, remove: false },
  reducers: {
    login(state) {
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
    alert(state) {
      state.alert = !state.alert;
    },
    remove(state) {
      state.remove = !state.remove;
    },
  },
});
const profileslice = createSlice({
  name: "credentials",
  initialState: {
    username: "",
    email: "",
    PhoneNo: "",
    search: "",
    price: "1",
    card: false,
  },
  reducers: {
    setprofile(state, action) {
      state.username = action.payload.name;
      state.email = action.payload.email;
      state.PhoneNo = action.payload.PhoneNo;
    },
    setsearch(state, action) {
      state.search = action.payload;
    },
    setprice(state, action) {
      state.price = action.payload;
      state.card = true;
    },
  },
});

const store = configureStore({
  reducer: { auth: authslice.reducer, profile: profileslice.reducer },
});
export const authaction = authslice.actions;
export const profileaction = profileslice.actions;

export default store;
