// Filename: App.js
import Pop from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ContactForm from "./ContactForm";
import { ContactList } from "./ContactList";
import { useNavigate } from "react-router-dom";
export default function Popup() {
  const navigate = useNavigate();
  let updateid = sessionStorage.getItem("update");
  const handleLogout = () => {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <div>
      <h4 style={{ textAlign: "center" }}>Contact Page</h4>

      <Pop
        trigger={<button> {updateid ? "Edit Contact" : "Add Contact"} </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <ContactForm />
            <div>
              <button onClick={() => close()}>Cancel</button>
            </div>
          </div>
        )}
      </Pop>
      <button onClick={handleLogout}>Logout</button>
      <ContactList />
    </div>
  );
}
