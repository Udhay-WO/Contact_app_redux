import { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
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
    setImage(e.target.value);
  };
  function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
  const handleSubmit = (e) =>{
    e.preventDefault();
   const data = JSON.parse(localStorage.getItem('users'));
  const contact =  data.map((item)=>{
    return item.contact
   })
   const imgData = getBase64Image(image);
   contact.push({name ,email ,phoneNumber ,imgData});
   localStorage.setItem()
  }
  return (
    <div>
      <form
        action=""
        method="post"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {" "}
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={handlename} />
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            name="image"
            value={image}
            onChange={handleImage}
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button type="submit" style={{ width: "180px" }}>
            Add Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
