import Pop from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SnackDemo from "./SnackDemo";
import ContactForm from "./ContactForm";
import { ContactList } from "./ContactList";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import ConfirmDialog from "./ConfirmButton";
import {
  getLocalStorageData,
  getSessionStorageData,
  removeSessionStorage,
  setLocalStorageData,
} from "./LocalStorageOperation";
import { useSearchParams } from "react-router-dom";
export default function Popup() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [message, setMessage] = useState(sessionStorage.getItem("message"));
  const [contactData] = useState(getLocalStorageData());
  const inputRef = useRef();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [openImportConfirm, setOpenImportConfirm] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedContact, setSelectedContact] = useState(null);
  const contactId = searchParams.get("contactId");
  const handleLogout = () => {
    removeSessionStorage("email");
    removeSessionStorage("isLoggedIn");
    sessionStorage.setItem("message", "User Logout");
    navigate("/");
  };
  useEffect(() => {
    if (contactId) {
      const data = getLocalStorageData();
      const email = getSessionStorageData("email");
      const user = data.find((item) => item.email === email);
      if (user) {
        const contact = user.contact.find((c) => c.contactId === contactId);
        setSelectedContact(contact || null);
      }
    }
  }, [contactId]);
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
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "contacts.csv";
    a.click();
    URL.revokeObjectURL(url);
    setMessage("Contacts exported successfully!");
    setOpen(true);
  };
  const handleImportWithConfirmation = (e) => {
    setImportFile(e.target.files[0]);
    setConfirmMessage("Are you sure you want to import contacts?");
    setOpenImportConfirm(true);
  };
  const handleUpdateMessage = () => {
    setOpen(true);
    setMessage("Contact Updated successFully");
  };
  const confirmCancel = () => {
    inputRef.current.value = null;
  };
  const confirmImport = () => {
    if (importFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const fileData = JSON.parse(reader.result);
        contactData.forEach((item) => {
          if (item.email == getSessionStorageData("email")) {
            item.contact = [...item.contact, ...fileData];
          }
        });
        setLocalStorageData(contactData);
        inputRef.current.value = null;
        setMessage("Contact imported");
        setOpen(true);
      };
      reader.readAsText(importFile);
    } else {
      setMessage("No file selected.");
      setOpen(true);
    }
  };
  const handleInsertMessage = () => {
    setOpen(true);
    setMessage("Contact inserted successfully");
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
        <h2 style={{ marginLeft: "10px", color: "white" }}>Welcome, {name}</h2>
        <button
          onClick={() => {
            setConfirmMessage("Are you sure, You want to Log out?");
            setOpenConfirm(true);
          }}
          style={{
            backgroundColor: "lightblue",
            color: "white",
            marginRight: "10px",
          }}
        >
          Log out
        </button>
        <ConfirmDialog
          open={openConfirm}
          onConfirm={handleLogout}
          setOpenConfirm={setOpenConfirm}
          confirmMessage={confirmMessage}
        />
      </header>
      <div>
        <SnackDemo open={open} set={setOpen} message={message} />
        <h2 style={{ textAlign: "center", marginTop: "80px" }}>Contact Page</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Pop open={Boolean(contactId)} modal nested>
            {(close) => (
              <div className="modal">
                <ContactForm
                  updateId={contactId}
                  contact={selectedContact}
                  getData={handleUpdateMessage}
                  close={() => {
                    setSearchParams("");
                    close();
                  }}
                />
                <div>
                  <button
                    onClick={() => {
                      close();
                      navigate("/contactform");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Pop>
          <Pop trigger={<button>Add Contact </button>} modal nested>
            {(close) => (
              <div className="modal">
                <ContactForm getData={handleInsertMessage} close={close} />
                <div>
                  <button
                    onClick={() => {
                      close();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </Pop>
          <button onClick={handleExport} style={{ marginLeft: "10px" }}>
            Export
          </button>
          <label htmlFor="import" style={{ marginLeft: "15px" }}>
            Import Contact :
          </label>
          <input
            type="file"
            onChange={handleImportWithConfirmation}
            ref={inputRef}
            name="import"
            accept=".csv"
            placeholder="Import file here"
            style={{ cursor: "pointer" }}
          />
        </div>
        <ContactList />
        <ConfirmDialog
          open={openImportConfirm}
          onConfirm={confirmImport}
          setOpenConfirm={setOpenImportConfirm}
          confirmMessage={confirmMessage}
          onCancel={confirmCancel}
        />
        {open && <SnackDemo open={open} set={setOpen} message={message} />}
      </div>
    </>
  );
}
