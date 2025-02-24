/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import SnackDemo from "./SnackDemo";
import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addContact, updateContact } from "../Store/Slice/ContactSlice";
import "./ContactForm.css";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required.")
    .matches(
      /^[A-Za-z\s]{3,}$/,
      "Name should contain only letters and be at least 3 characters long."
    ),
  email: Yup.string()
    .required("Email address is required.")
    .email("Please enter a valid email address."),
  phoneNumber: Yup.string()
    .required("phone number is required.")
    .matches(
      /^\d{10}$/,
      "Phone number must contain only digits and be exactly 10 digits long."
    ),
});
const ContactForm = ({ updateId, contact, close, getData }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const editId = useMemo(() => (updateId ? JSON.stringify(updateId) : null), [updateId]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: contact ? contact.name : "",
      email: contact ? contact.email : "",
      phoneNumber: contact ? contact.phoneNumber : "",
      image: contact ? contact.image : "",
    },
  });
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setOpen(true);
        setMessage("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
        inputRef.current.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setValue("image", "");
    inputRef.current.value = null;
  };
  const onSubmit = (data) => {
    const contactData = {
      contactId: uuidV4(),
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      image: data.image,
    };
    const contactUpdateData = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      image: data.image,
    };
    if (editId) {
      dispatch(updateContact({ id: updateId, contactUpdateData }));
      resetForm();
    } else {
      dispatch(addContact(contactData));
      resetForm();
    }
  };
  const resetForm = () => {
    reset();
    getData();
    close();
  }
  return (
    <div className="contact-form-container">
      <h3>{editId ? "Edit Contact" : "Add Contact"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            {...register("name")}
          />
          <small className="error">{errors.name?.message}</small>
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            {...register("email")}
          />
          <small className="error">{errors.email?.message}</small>
        </div>
        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter 10-digit number"
            {...register("phoneNumber")}
          />
         {watch("phoneNumber") && <small className="error">{errors.phoneNumber?.message}</small>}
        </div>
        <div className="input-group file-upload">
          <label htmlFor="image">
            <img
              src={
                watch("image") ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlz-TKOccaHn9IPHPOBVUJKOxcrSMhc3uhkw&s"
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
            {...register("image")}
            onChange={handleImage}
            accept="image/*"
            ref={inputRef}
          />
          {watch("image") && <small className="error">{errors.image?.message}</small>}
          {watch("image") && (
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
      {open && <SnackDemo open={open} set={setOpen} message={message} />}
    </div>
  );
};

export default ContactForm;
