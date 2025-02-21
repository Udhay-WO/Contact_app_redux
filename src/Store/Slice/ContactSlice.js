import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageData,
  getSessionStorageData,
  setLocalStorageData,
} from "../../component/LocalStorageOperation";

let sessiondata = getSessionStorageData("email");

const contactSlice = createSlice({
  name: "contactList",
  initialState: getLocalStorageData(),
  reducers: {
    addContact(state, action) {
      const user = state.find((element) => element.email === sessiondata);
      if (user) {
        user.contact.push(action.payload);
        setLocalStorageData(state);
      }
    },
    updateContact(state, action) {
      const contactData = state.map((element) => {
        if (element.email === sessiondata) {
          element.contact = element.contact.map((item) => {
            if (item.contactId === action.payload.id) {
              return {
                ...item,
                ...action.payload.contactUpdateData,
              };
            }
            return item;
          });
        }
        return element;
      });
      setLocalStorageData(contactData);
    },
    deleteContact(state, action) {
      const contactData = state.map((element) => {
        if (element.email === sessiondata) {
          element.contact = element.contact.filter(
            (item) => item.contactId !== action.payload
          );
        }
        return element;
      });

      setLocalStorageData(contactData);
    },
  },
});

export default contactSlice;
export const { addContact, updateContact, deleteContact } =
  contactSlice.actions;
