/* eslint-disable react/prop-types */
import { useState } from "react";
import SnackDemo from "./SnackDemo";
import {
  getLocalStorageData,
  getSessionStorageData,
  removeSessionStorage,
  setLocalStorageData,
  setSessionStorageContact,
  setSessionStorageUpdateId,
} from "./LocalStorageOperation";

export const ContactList = ({ sendData }) => {
  let datas = getLocalStorageData();

  const [list, setList] = useState(datas);
  const [open, setOpen] = useState(false);
  let sessiondata = getSessionStorageData("email");

  function handleEdit(id, i) {
    setSessionStorageContact(JSON.stringify(i));
    setSessionStorageUpdateId(JSON.stringify(id));
    sendData(i);
    window.scrollTo(0, 0);
  }
  const handleDelete = (index) => {
    datas.map((item) => {
      return item.contact.splice(index, 1);
    });
    setLocalStorageData([...datas]);
    setList([...datas]);
    removeSessionStorage("updateid");
    removeSessionStorage("contact");
    setOpen(true);
  };

  return (
    
    <div>
      <ul>
        {list.map((item) => {
          if (item.email == sessiondata) {
            return item.contact.map((i, index) => {
              return (
                <>
                <li
                  key={index}
                  style={{
                    width: "400px",
                    backgroundColor: "",
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >{i.image ?
                  <img
                    src={`data:image/png;base64,${i.image}`}
                    alt={`${i.name}Image`}
                    width="80px"
                    height="80px"
                  /> : <div  style={{backgroundColor:"lightgrey",width:"100px",height:"50px",textAlign:"center"}}>No Image</div>}
                  <span> Name : {i.name}</span>
                  <span> Email : {i.email} </span>
                  <span>Phone Number : {i.phoneNumber}</span>
                  <br />
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => handleEdit(index, i)}
                    >
                      Edit contact
                    </button>
                    <button
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete Contact
                    </button>
                  </div>
                </li>
                <br />
                </>
              );
            });
          }
        })}
      </ul>

      <br />
      <SnackDemo open={open} set={setOpen} message={"Contact Deleted"} />
    </div>
  );
};
