import { useState } from "react";
import SnackDemo from "./SnackDemo";

export const ContactList = () => {
  let datas = JSON.parse(localStorage.getItem("users"));
  const [list, setList] = useState(datas);
  const [open, setOpen] = useState(false);
  let sessiondata = sessionStorage.getItem("email");

  const setFormdata = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };

  // useEffect(()=>{
  //   setList(datas)
  //  },[])
  function handleEdit(id) {
    
    sessionStorage.setItem("update", JSON.stringify(id));
  }
  const handleDelete = (index) => {
    datas.map((item) => {
      return item.contact.splice(index, 1);
    });
    setFormdata([...datas]);
    setList([...datas]);
    setOpen(true);
  };

  return (
    <div>
      <ul>
        {list.map((item) => {
          if (item.email == sessiondata) {
            return item.contact.map((i, index) => {
              return (
                <li
                  key={index}
                  style={{
                    width: "400px",
                    backgroundColor: "gray",
                    color: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`data:image/png;base64,${i.image}`}
                    alt={i.name}
                    width="100px"
                    height="100px"
                  />
                  <br />
                  <span> Name : {i.name}</span>
                  <span> Email : {i.email} </span>
                  <span>Phone Number : {i.phoneNumber}</span>
                  <br />
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <button
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => handleEdit(index)}
                    >
                      Edit contact
                    </button>
                    <button
                      style={{ fontSize: "0.8rem" }}
                      onClick={() => handleDelete(index)}
                    >
                      Delete Contact
                    </button>
                  </div>
                  <br />
                </li>
              );
            });
          }
        })}
      </ul>

      <br />
      <SnackDemo open={open} set={setOpen} message={"Contact Deleted"} />
    </div>
  );
};
