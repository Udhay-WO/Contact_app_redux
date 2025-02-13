// Filename: App.js
import Pop from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SnackDemo from "./SnackDemo";
import ContactForm from "./ContactForm";
import { ContactList } from "./ContactList";
import { useNavigate } from "react-router-dom";
import { useState,useRef } from "react";
import { removeSessionStorage, setLocalStorageData } from "./LocalStorageOperation";
export default function Popup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [uuid, setuuid] = useState();
  const [message,setMessage] = useState(""); 
  const inputRef = useRef();
  const handleLogout = () => {
    removeSessionStorage("email");
    removeSessionStorage("authToken");
    navigate("/");
  };
  let data = JSON.parse(localStorage.getItem("users"));
  const handleExport = () => {
    const data = JSON.parse(localStorage.getItem("users"));
    const email = sessionStorage.getItem("email");
    const contact = data.map((item) => {
     if(item.email == email){return item.contact} 
    });
    const blob = new Blob([JSON.stringify(contact)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.json";
    a.click();
    setMessage("Contact exported")
    setOpen(true);
  };
  const handleImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileData = JSON.parse(reader.result);
      data.forEach((item)=>{
        item.contact.push(fileData);
      })
      setLocalStorageData(data);
      inputRef.current.value = null;
      setMessage("Contact imported")
      setOpen(true);
    };
    reader.readAsText(file);
  };
  const handleCall = (dat) => {
    setuuid(dat);
  };
  const handleCancel = () => {
    setuuid("");
  };
  return (
    <div >
      <SnackDemo open={open} set={setOpen} message={message} />
      <h4 style={{ textAlign: "center" }}>Contact Page</h4>

      <Pop
        trigger={<button> {uuid ? "Edit Contact" : "Add Contact"} </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <ContactForm uuid={uuid} getData={handleCancel} />
            <div>
              <button
                onClick={() => {
                  close();
                  removeSessionStorage("updateid");
                  removeSessionStorage("contact");
                  setuuid("");
                }}
              >
                {uuid ? "Edit" : ""} Cancel
              </button>
            </div>
          </div>
        )}
      </Pop>
      <button onClick={handleLogout} style={{position:"absolute",top:"5rem",right:"5rem",backgroundColor:"skyblue",color:"white"}}>Logout</button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          columnGap: "20px",
          marginTop:"20px"
        }}
      >
        <button onClick={handleExport}>Export</button>
        <input type="file" onChange={handleImport} ref={inputRef}/>
      </div>
      <ContactList sendData={handleCall} />
    </div>
  );
}
