import { createSlice } from "@reduxjs/toolkit";
import {
  getLocalStorageData,
  getSessionStorageData,
  setLocalStorageData,
} from "../../component/LocalStorageOperation";

const contactSlice = createSlice({
  name: "contactList",
  initialState: getLocalStorageData(),
  reducers: {
    addContact(state, action) {
      let sessiondata = getSessionStorageData("email");
      const updatedState = state.map((element) => {
        if (element.email === sessiondata) {
          console.log(sessiondata)
          console.log(element.email)
          return {
            ...element,
            contact: [...element.contact, action.payload], 
          };
        }
        return element;
      });
    
      setLocalStorageData(updatedState); 
      return updatedState; 
    },
    updateContact(state, action) {
      const contactData = state.map((element) => {
        let sessiondata = getSessionStorageData("email");
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
        let sessiondata = getSessionStorageData("email");
        if (element.email === sessiondata) {
          element.contact = element.contact.filter(
            (item) => item.contactId !== action.payload
          );
        }
        return element;
      });
      setLocalStorageData(contactData);
    },
    updateContactList: (state, action) => {
      setLocalStorageData(action.payload);
      return action.payload; 
    },
  },
});

export default contactSlice;
export const { addContact, updateContact, deleteContact,updateContactList } =
  contactSlice.actions;
