import { useState } from "react";
import SnackDemo from "./SnackDemo";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  // const [val, setVal] = useState(null);
  let updateid = sessionStorage.getItem("update") || null;
  // const data = JSON.parse(localStorage.getItem("users"));
  // const sessiondata = sessionStorage.getItem("email");
  // data.map((element) => {
  //   if (element.email == sessiondata) {
  //     return element.contact.map((item, index) => {
  //       if (index == updateid) {
  //         setVal(item);
  //         return;
  //       }
  //     });
  //   }
  // });
  const handlename = (e) => {
    setName(e.target.value);
  };
  const handlemail = (e) => {
    setEmail(e.target.value);
  };
  const handlephonenumber = (e) => {
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
  const setFormdata = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };
  const insertContact = (data, sessiondata) => {
    data.forEach((element) => {
      if (element.email == sessiondata) {
        element.contact.push({ name, email, phoneNumber, image });
      }
    });
    setFormdata(data);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setImage(null);
    setOpen(true);
    setMessage("Contact added success");
  };
  const updateContact = (data, sessiondata) => {
    data.map((element) => {
      if (element.email == sessiondata) {
        return element.contact.map((item, index) => {
          if (index == updateid) {
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
    setFormdata(data);
    setName("");
    setEmail("");
    setPhoneNumber("");
    setImage(null);
    sessionStorage.removeItem("update");
    setOpen(true);
    setMessage("Contact updated success");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("users"));
    const sessiondata = sessionStorage.getItem("email");
    if (updateid) {
      updateContact(data, sessiondata);
    } else {
      insertContact(data, sessiondata);
    }
  };
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>
        {" "}
        {updateid ? "Edit Contact" : "Add Contact"}{" "}
      </h2>
      <form
        action=""
        method="post"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {" "}
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handlename}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="email">Email </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handlemail}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="phone">Phone number</label>
          <input
            type="tel"
            name="phone"
            value={phoneNumber}
            onChange={handlephonenumber}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="image">Upload image</label>
          <input type="file" name="image" onChange={handleImage} />
        </div>

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            type="submit"
            style={{ width: "180px", backgroundColor: "lightblue" }}
          >
            {updateid ? "Edit Contact" : "Add Contact"}
          </button>
        </div>
      </form>

      <SnackDemo open={open} set={setOpen} message={message} />
    </div>
  );
};

export default ContactForm;
