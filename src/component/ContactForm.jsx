/* eslint-disable react/prop-types */
import { useState, useRef,useEffect } from "react";
import SnackDemo from "./SnackDemo";
import { v4 as uuidv4 } from "uuid";
import "./ContactForm.css";
import {
  getLocalStorageData,
  getSessionStorageData,
  setLocalStorageData,
} from "./LocalStorageOperation";
const ContactForm = ({ updateId, contact, close, getData }) => {
  const [name, setName] = useState(contact ? contact.name : "");
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [phoneNumber, setPhoneNumber] = useState(
    contact ? contact.phoneNumber : ""
  );
  const [image, setImage] = useState(contact ? contact.image : "");
  const [open, setOpen] = useState(false);
  const [editId, seteditId] = useState(
    updateId ? JSON.stringify(updateId) : null
  );
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [numberError, setNumberError] = useState("");
  const [imageError, setImageError] = useState("");
  const inputRef = useRef();
  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setEmail(contact.email);
      setPhoneNumber(contact.phoneNumber);
      setImage(contact.image);
    }
  }, [contact]);
  const handleRemoveImage = () => {
    setImage("");
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
      e.target.value = '';
      return;
    }else{
      setImageError("")
    }
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
      setNameError(
        "Name should contain only letters and have atleast 2 characters long."
      );
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
        element.contact.push({
          contactid: uuidv4(),
          name,
          email,
          phoneNumber,
          image,
        });
      }
    });
    setLocalStorageData(data);
    setName("");
    setEmail("");
    setPhoneNumber("");
    inputRef.current.value = null;
    getData(data);
    close();
  };
  const updateContact = (data, sessiondata) => {
    const updatedData = data.map((element) => {
      if (element.email === sessiondata) {
        const updatedContact = element.contact.map((item) => {
          if (item.contactid === updateId) {
            return {
              ...item,
              name: name,
              email: email,
              phoneNumber: phoneNumber,
              image: image,
            };
          }
          return item;
        });
        return { ...element, contact: updatedContact };
      }
      return element;
    });
    setLocalStorageData(updatedData);
    setName("");
    setEmail("");
    setPhoneNumber("");
    inputRef.current.value = null;
    getData(updatedData);
    close();
    seteditId(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = getLocalStorageData();
      let sessiondata = getSessionStorageData("email");
      if (editId) {
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
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <small className="error">{nameError}</small>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small className="error">{emailError}</small>
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <small className="error">{numberError}</small>
        </div>
        <div className="input-group file-upload">
          <label htmlFor="image">
            <img
              src={
                image
                  ? `data:image/png;base64,${image}`
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlz-TKOccaHn9IPHPOBVUJKOxcrSMhc3uhkw&s"
              }
              alt="upload"
              className="upload-icon"
              width="100px"
              height="80px"
            />
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImage}
            accept="image/*"
            ref={inputRef}
          />
          <small className="error">{imageError}</small>
          {image && (
            <button
              type="button"
              className="remove-image-btn"
              onClick={handleRemoveImage}
            >
              Remove Image
            </button>
          )}
        </div>
        <button type="submit" className="submit-btn">
          {editId ? "Edit Contact" : "Add Contact"}
        </button>
      </form>
      {open && <SnackDemo open={open} set={setOpen} />}
    </div>
  );
};
export default ContactForm;
