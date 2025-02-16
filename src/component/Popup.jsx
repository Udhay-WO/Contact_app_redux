import Pop from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SnackDemo from "./SnackDemo";
import ContactForm from "./ContactForm";
import { ContactList } from "./ContactList";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  getLocalStorageData,
  getSessionStorageData,
  removeSessionStorage,
  setLocalStorageData,
} from "./LocalStorageOperation";
export default function Popup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [updateId, setUpdateId] = useState();
  const [message, setMessage] = useState(sessionStorage.getItem("message"));
  sessionStorage.removeItem("message");
  const [contactData, setContactData] = useState(getLocalStorageData());
  const inputRef = useRef();
  const handleLogout = () => {
    const result = confirm("Want to Logout ?");
    if (result) {
      removeSessionStorage("email");
      removeSessionStorage("authToken");
      sessionStorage.setItem("message", "User Logout");
      navigate("/");
    }
  };
  const name = contactData.map((item) => {
    if (item.email == getSessionStorageData("email")) {
      return item.name;
    }
  });
  const handleExport = () => {
    const data = getLocalStorageData();
    const email = getSessionStorageData("email");
    const user = data.find((item) => item.email === email);
    if (!user || !user.contact.length) {
      setMessage("No contacts to export!");
      setOpen(true);
      return;
    }
    const blob = new Blob([JSON.stringify(user.contact, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Contacts exported successfully!");
    setOpen(true);
  };  
  const handleImport = (e) => {
    const result = confirm("Want to Import Contact ?");
    if(result){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileData = JSON.parse(reader.result);
      contactData.forEach((item) => {
        if(item.email ==  getSessionStorageData("email")){
          item.contact = [...item.contact,...fileData];
        }
      });
      setLocalStorageData(contactData);
      setContactData(contactData);
      inputRef.current.value = null;
      setMessage("Contact imported");
      setOpen(true);
    };
    reader.readAsText(file);
  }else{
    inputRef.current.value = "";
  }
  };
  const handleCall = (dat) => {
    setUpdateId(dat);
  };
  const handleCancel = (data) => {
    setContactData(data);
    setUpdateId("");
  };
  return (
    <>
      <header
        style={{
          width: "100%",
          display: "flex",
          position: "absolute",
          top: "0px",
          right: "0px",
          left: "0px",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "skyblue",
        }}
      >
        <h2 style={{ marginLeft: "10px", color: "white" }}>
          {" "}
          Welcome, {name}{" "}
        </h2>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "lightblue",
            color: "white",
            marginRight: "10px",
          }}
        >
          Logout
        </button>
      </header>
      <div>
        <SnackDemo open={open} set={setOpen} message={message} />
        <h3 style={{ textAlign: "center", marginTop: "80px" }}>Contact Page</h3>

        <Pop
          trigger={
            <button> {updateId ? "Edit Contact" : "Add Contact"} </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="modal">
              <ContactForm updateId={updateId} getData={handleCancel} close={close}/>
              <div>
                <button
                  onClick={() => {
                    close();
                    removeSessionStorage("updateid");
                    removeSessionStorage("contact");
                    setUpdateId("");
                  }}
                >
                  {updateId ? "Edit" : ""} Cancel
                </button>
              </div>
            </div>
          )}
        </Pop>
        <button onClick={handleExport} style={{ marginLeft: "10px" }}>
          Export
        </button>
        <label htmlFor="import" style={{ marginLeft: "15px" }}>
          Import Contact :{" "}
        </label>
        <input
          type="file"
          onChange={handleImport}
          ref={inputRef}
          name="import"
          id="import"
        />
         <ContactList sendData={handleCall} contactData={contactData} />
       
      </div>
    </>
  );
}
