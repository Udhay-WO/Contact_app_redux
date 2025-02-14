/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import SnackDemo from "./SnackDemo";
import {
  getLocalStorageData,
  getSessionStorageData,
  removeSessionStorage,
  setLocalStorageData,
} from "./LocalStorageOperation";
const ContactForm = ({ updateId, getData }) => {
  const contact = JSON.parse(getSessionStorageData("contact"));
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phoneNumber, setPhoneNumber] = useState(
    contact ? contact.phoneNumber : ""
  );
  const [image, setImage] = useState(contact ? contact.image : "");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [editId, seteditId] = useState(updateId);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const inputRef = useRef();
  let sessionUpdateId = getSessionStorageData("updateid") || null;
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
    inputRef.current.value = null;
    getData(data);
    setOpen(true);
    setMessage("Contact added success");
  };
  const updateContact = (data, sessiondata) => {
    data.map((element) => {
      if (element.email == sessiondata) {
        return element.contact.map((item, index) => {
          if (index == sessionUpdateId) {
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
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }
    if (phoneNumber.trim() == "") {
      setNumberError("Please enter phone number.");
      isValid = false;
    } else {
      setNumberError("");
    }
    if (email.trim() == "") {
      setEmailError("Please enter email address.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }
    if (isValid) {
      if (updateId) {
        updateContact(data, sessiondata);
      } else {
        insertContact(data, sessiondata);
      }
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {editId ? "Edit Contact" : "Add Contact"}
      </h2>
      <form
        style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handleName} />
        </div>
        <div style={{ textAlign: "center", color: "red", fontSize: "0.8rem" }}>
          {nameError}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            title="Please enter valid email address"
          />
        </div>
        <div style={{ textAlign: "center", color: "red", fontSize: "0.8rem" }}>
          {emailError}
        </div>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10 digit number"
            value={phoneNumber}
            onChange={handlePhoneNumber}
            pattern="[0-9]{10}"
          />
        </div>
        <div style={{ textAlign: "center", color: "red", fontSize: "0.8rem" }}>
          {numberError}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <label htmlFor="image">
            <img
              src="https://cdn.dribbble.com/userupload/23482189/file/original-4b4341b1c99f00f52c5f4b278d556409.png?resize=400x0"
              alt="upload image"
              width="200px"
              height="120px"
            />
          </label>
          
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImage}
            ref={inputRef}
          />
        </div>
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
