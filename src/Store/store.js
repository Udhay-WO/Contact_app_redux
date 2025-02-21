import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./Slice/ContactSlice";
const store = configureStore({
  reducer: {
    contactList: contactSlice.reducer,
  },
});

export default store;
