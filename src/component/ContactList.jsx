/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState } from "react";
import SnackDemo from "./SnackDemo";
import {
  getSessionStorageData,
  removeSessionStorage,
  setLocalStorageData,
  setSessionStorageContact,
  setSessionStorageUpdateId,
} from "./LocalStorageOperation";
export const ContactList = ({ sendData, contactData }) => {
  const [open, setOpen] = useState(false);
  let sessiondata = getSessionStorageData("email");
  function handleEdit(id, i) {
    setSessionStorageContact(JSON.stringify(i));
    setSessionStorageUpdateId(JSON.stringify(id));
    sendData(i);
    window.scrollTo(0, 0);
  }
  const handleDelete = (index) => {
    const result = confirm("Want to delete contact ?");
    if (result) {
      contactData.map((item) => {
        return item.contact.splice(index, 1);
      });
      setLocalStorageData([...contactData]);
      removeSessionStorage("updateid");
      removeSessionStorage("contact");
      setOpen(true);
      sendData("");
    }
  };
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Contact list</h3>
      {
        contactData.some((item) => item.email === getSessionStorageData("email") && item.contact.length > 0) ? (
          <table border="1px">
          <thead>
            <tr>
              <th>image</th>
              <th>Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((item) => {
              if (item.email == sessiondata) {
                return item.contact.map((i, index) => {
                  return (
                    <tr key={index} >
                      <td style={{display:"flex",justifyContent:"center",width:"150px"}}>
                        {i.image ? <img
                          src={`data:image/png;base64,${i.image}`}
                          alt={i.name}
                          width="100px"
                          height="100px"
                        />:<img
                        src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                        alt=""
                        width="100px"
                        height="100px"
                      />}
                      </td>
                      <td style={{textAlign:"center",width:"8rem"}}>{i.name}</td>
                      <td style={{textAlign:"center",width:"8rem"}}>{i.phoneNumber}</td>
                      <td style={{textAlign:"center",width:"10rem"}}>{i.email}</td>
                      <td style={{width:"15rem",padding:"0px 10px"}}> <button
                          style={{ fontSize: "0.8rem",backgroundColor:"skyblue" }}
                          onClick={() => handleEdit(index, i)}
                        >
                          Edit contact
                        </button>
                        <button
                          style={{ fontSize: "0.8rem",backgroundColor:"skyblue",marginLeft:"5px" }}
                          onClick={() => handleDelete(index)}
                        >
                          Delete Contact
                        </button></td>
                    </tr>
                  );
                });
              }
            })}
          </tbody>
        </table>):(
          <p style={{textAlign:"center",color:"red"}}>No contact found</p>
        )
      }
        <SnackDemo open={open} set={setOpen} message={"Contact Deleted"} />
    </div>
  );
};
