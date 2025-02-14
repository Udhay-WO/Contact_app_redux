/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import SnackDemo from "./SnackDemo";
import {
  getLocalStorageData,
  getSessionStorageData,
  removeSessionStorage,
  setLocalStorageData,
} from "./LocalStorageOperation";
const ContactForm = ({ uuid, getData }) => {
  const contact = JSON.parse(getSessionStorageData("contact"));
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phoneNumber, setPhoneNumber] = useState(
    contact ? contact.phoneNumber : ""
  );
  const [image, setImage] = useState(contact ? contact.image : "");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editId, seteditId] = useState(uuid);
  const inputRef = useRef();
  let updateId = getSessionStorageData("updateid") || null;

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64StringUS = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      setImage(base64StringUS);
    };
    reader.readAsDataURL(file);
  };
  const insertContact = (data, sessiondata) => {
    data.forEach((element) => {
      if (element.email == sessiondata) {
        element.contact.push({ name, email, phoneNumber, image });
      }
    });
    setLocalStorageData(data);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setImage(null);
    inputRef.current.value = null;
    getData(data);
    setOpen(true);
    setMessage("Contact added success");
  };
  const updateContact = (data, sessiondata) => {
    data.map((element) => {
      if (element.email == sessiondata) {
        return element.contact.map((item, index) => {
          if (index == updateId) {
            return Object.assign(item, {
              name: name,
              email: email,
              phoneNumber: phoneNumber,
              image: image,
            });
          }
        });
      }
    });
    setLocalStorageData(data);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setImage(null);
    removeSessionStorage("updateid");
    removeSessionStorage("contact");
    inputRef.current.value = null;
    getData(data);
    setOpen(true);
    setMessage("Contact updated success");
    seteditId("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = getLocalStorageData();
    const sessiondata = getSessionStorageData("email");
    let isValid = true;
    if (name.trim() == "") {
      isValid = false;
    }
    if (phoneNumber.trim() == "") {
      isValid = false;
    }
    if (isValid) {
      if (updateId) {
        updateContact(data, sessiondata);
      } else {
        insertContact(data, sessiondata);
      }
      setErrorMessage("");
    } else {
      setErrorMessage("Please fill name & phone number fields");
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {" "}
        {editId ? "Edit Contact" : "Add Contact"}
      </h2>
      <form
        method="post"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleName}
            required
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            required
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10 digit number"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            required
            pattern="[0-9]{10}"
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            name="image"
            onChange={handleImage}
            ref={inputRef}
            required
          />
        </div>

        <br />
        <div style={{ textAlign: "center", color: "red" }}>{errorMessage}</div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={{ width: "180px", backgroundColor: "lightblue" }}
          >
            {editId ? "Edit Contact" : "Add Contact"}
          </button>
        </div>
      </form>

      <SnackDemo open={open} set={setOpen} message={message} />
    </div>
  );
};

export default ContactForm;
