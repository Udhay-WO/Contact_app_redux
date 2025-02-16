/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import SnackDemo from "./SnackDemo";
import "./ContactForm.css";
import {
  getLocalStorageData,
  getSessionStorageData,
  removeSessionStorage,
  setLocalStorageData,
} from "./LocalStorageOperation";

const ContactForm = ({ updateId, getData,close }) => {
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
  console.log(sessionUpdateId)
  const handleRemoveImage = () => {
    setImage("");
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

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required.");
      isValid = false;
    } else if (!/^[A-Za-z\s]{2,}$/.test(name)) {
      setNameError("Name should contain only letters and be at least 2 characters long.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!email.trim()) {
      setEmailError("Please enter email address.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!phoneNumber.trim()) {
      setNumberError("Please enter phone number.");
      isValid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      setNumberError("Phone number must be exactly 10 digits.");
      isValid = false;
    } else {
      setNumberError("");
    }

    return isValid;
  };

  const insertContact = (data, sessiondata) => {
    data.forEach((element) => {
      if (element.email === sessiondata) {
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
    setMessage("Contact added successfully");
    setTimeout(() => {
      close();
    }, 1000);
  };
  const updateContact = (data, sessiondata) => {
    data.forEach((element) => {
      if (element.email === sessiondata) {
        element.contact = element.contact.map((item, index) => {
          if (index == sessionUpdateId) {
            return {
              ...item,
              name: name,
              email: email,
              phoneNumber: phoneNumber,
              image: image,
            }
          }
          return item;
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
    setMessage("Contact updated successfully");
    setTimeout(() => {
      close();
    }, 1000);
    seteditId("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = getLocalStorageData();
      let sessiondata = getSessionStorageData("email");
      if (updateId) {
        updateContact(data, sessiondata);
      } else {
        insertContact(data, sessiondata);
      }
    }
  };
  return (
    <div className="contact-form-container">
      <h2>{editId ? "Edit Contact" : "Add Contact"}</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
          <small className="error">{nameError}</small>
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <small className="error">{emailError}</small>
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" name="phone" placeholder="Enter 10-digit number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          <small className="error">{numberError}</small>
        </div>

        <div className="input-group file-upload">
          <label htmlFor="image">
            <img
              src={
                image
                  ? `data:image/png;base64,${image}`
                  : "https://cdn.dribbble.com/userupload/23482189/file/original-4b4341b1c99f00f52c5f4b278d556409.png?resize=400x0"
              }
              alt="upload"
              className="upload-icon"
              width="100px"
              height="80px"
            />
          </label>
          <input type="file" id="image" name="image" onChange={handleImage} ref={inputRef} />

          {image && (
            <button type="button" className="remove-image-btn" onClick={handleRemoveImage}>
              Remove Image
            </button>
          )}
        </div>

        <button type="submit" className="submit-btn">
          {editId ? "Edit Contact" : "Add Contact"}
        </button>
      </form>

      {/* Show Snackbar only on Add or Update */}
      {open && <SnackDemo open={open} set={setOpen} message={message} />}
    </div>
  );
};

export default ContactForm;
