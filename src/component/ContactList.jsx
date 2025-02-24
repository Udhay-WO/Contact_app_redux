import "reactjs-popup/dist/index.css";
import { useState } from "react";
import SnackDemo from "./SnackDemo";
import { useNavigate } from "react-router-dom";
import { deleteContact } from "../Store/Slice/ContactSlice";
import { useDispatch, useSelector } from "react-redux";
import { getSessionStorageData } from "./LocalStorageOperation";
import ConfirmDialog from "./ConfirmButton";
export const ContactList = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const dispatch = useDispatch();
  const displayContactList = useSelector((state) => {
    return state.contactList;
  });
  const navigate = useNavigate();
  let sessiondata = getSessionStorageData("email");
  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    navigate("/contactform")
    setOpen(true);
    setMessage("Contact deleted");
  };
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Contact list</h3>
      {displayContactList && displayContactList.some(
        (item) => item.email === sessiondata && item.contact.length > 0
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
            {displayContactList.map((item) => {
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
                            src={i.image}
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
                        <button
                          style={{
                            fontSize: "0.8rem",
                            backgroundColor: "skyblue",
                            marginLeft: "5px",
                          }}
                          onClick={() => navigate(`?contactId=${i.contactId}`)}
                        >
                          Edit contact
                        </button>
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
                          index={i.contactId}
                          setOpenConfirm={setOpenConfirm}
                          confirmMessage={confirmMessage}
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
