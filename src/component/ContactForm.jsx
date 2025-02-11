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
    const imageBlob = new Blob([e.target.files[0]], { type: 'image/png' });
    setImage(URL.createObjectURL(imageBlob));
  };
  const setFormdata = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };
 
  const handleSubmit = (e) =>{
    e.preventDefault();
   const data = JSON.parse(localStorage.getItem('users'));
   const sessiondata = sessionStorage.getItem("email");
   data.forEach(element => {
    if(element.email == sessiondata){
      element.contact.push({name ,email ,phoneNumber ,image})
    }
      
   });
   setFormdata(data)
  setName('')
  setEmail('')
  setPhoneNumber('')
  setImage('')
  }
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Add Contact</h1>
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
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <label htmlFor="image">Upload image</label>
          <input
            type="file"
            name="image"
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
