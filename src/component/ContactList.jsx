/* eslint-disable react/prop-types */
import Pop from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState, useEffect } from "react";
import SnackDemo from "./SnackDemo";
import ContactForm from "./ContactForm";
import {
  getSessionStorageData,
  setLocalStorageData,
} from "./LocalStorageOperation";
import ConfirmDialog from "./ConfirmButton";
export const ContactList = ({ sendData, contactData }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confrimMessage, setConfirmMessage] = useState("");
  const [contactList, setContactList] = useState(contactData);

  useEffect(() => {
    setContactList(contactData);
  }, [contactData]);
  let sessiondata = getSessionStorageData("email");
  const handleUpdate = (data) => {
    setContactList(data);
    setOpen(true);
    setMessage("Contact updated successfully");
  };
  const handleDelete = (index) => {
    const data = contactList.map((item) => {
      if (item.email == sessiondata) {
        const updateContacts = item.contact.filter(
          (i) => i.contactid !== index
        );
        return { ...item, contact: updateContacts };
      }
      return item;
    });
    setLocalStorageData([...data]);
    setContactList([...data]);
    setOpen(true);
    setMessage("Contact deleted");
    sendData("");
  };
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Contact list</h3>
      {contactData.some(
        (item) =>
          item.email === getSessionStorageData("email") &&
          item.contact.length > 0
      ) ? (
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
            {contactList.map((item) => {
              if (item.email == sessiondata) {
                return item.contact.map((i, index) => {
                  return (
                    <tr key={index}>
                      <td
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "150px",
                        }}
                      >
                        {i.image ? (
                          <img
                            src={`data:image/png;base64,${i.image}`}
                            alt={i.name}
                            width="100px"
                            height="100px"
                          />
                        ) : (
                          <img
                            src="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
                            alt="profile image"
                            width="100px"
                            height="100px"
                          />
                        )}
                      </td>
                      <td style={{ textAlign: "center", width: "8rem" }}>
                        {i.name}
                      </td>
                      <td style={{ textAlign: "center", width: "8rem" }}>
                        {i.phoneNumber}
                      </td>
                      <td style={{ textAlign: "center", width: "10rem" }}>
                        {i.email}
                      </td>
                      <td style={{ width: "17rem", padding: "0px 10px" }}>
                        <Pop
                          trigger={
                            <button
                              style={{
                                fontSize: "0.8rem",
                                backgroundColor: "skyblue",
                                marginLeft: "5px",
                              }}
                            >
                              Edit contact
                            </button>
                          }
                          modal
                          nested
                        >
                          {(close) => (
                            <div className="modal">
                              <ContactForm
                                updateId={i.contactid}
                                contact={i}
                                close={close}
                                getData={handleUpdate}
                              />
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
                        <button
                          style={{
                            fontSize: "0.8rem",
                            backgroundColor: "skyblue",
                            marginLeft: "5px",
                          }}
                          onClick={() => {
                            setOpenConfirm(true);
                            setConfirmMessage(
                              "Are you sure You want to delete Contact ?"
                            );
                          }}
                        >
                          Delete Contact
                        </button>
                        <ConfirmDialog
                          open={openConfirm}
                          onConfirm={handleDelete}
                          index={i.contactid}
                          setOpenConfirm={setOpenConfirm}
                          confrimMessage={confrimMessage}
                        />
                      </td>
                    </tr>
                  );
                });
              }
            })}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>No contact found</p>
      )}
      <SnackDemo open={open} set={setOpen} message={message} />
    </div>
  );
};
