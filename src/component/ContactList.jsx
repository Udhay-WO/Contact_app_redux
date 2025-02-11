import { useNavigate } from "react-router-dom";
export const ContactList = () => {
    let datas = JSON.parse(localStorage.getItem("users"));
    let sessiondata = sessionStorage.getItem("email");
    const navigate = useNavigate();
  const setFormdata = (data) => {
    localStorage.setItem("users", JSON.stringify(data));
  };
  const handleLogout = () => {
    sessionStorage.removeItem("email");
    navigate("/")
  }
  const handleEdit = () =>{
    
  }
  const handleDelete = (index) =>{
    datas.map((item)=>{
        return item.contact.splice(index,1)
    })
    setFormdata([...datas])
  }
  return (
    <div>
      <ul>
        {datas.map((item) => {
            if (item.email == sessiondata) {
                return item.contact.map((i, index) => {
                    console.log(index);
                    return (
                      <li
                        key={index}
                        style={{
                          width: "400px",
                          backgroundColor: "gray",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <img src={`${i.image}`} alt={`${i.name} Image`} />
                        <p>{i.name}</p>
                        <p>{i.email}</p>
                        <p>{i.phoneNumber}</p>
                        <div
                          style={{ display: "flex", justifyContent: "space-around" }}
                        >
                          <button style={{ fontSize: "0.8rem" }} onClick={() =>handleEdit(index)}>Edit contact</button>
                          <button style={{ fontSize: "0.8rem" }} onClick={() =>handleDelete(index)}>Delete Contact</button>
                        </div>
                      </li>
                    );
                  });
                
            }
        })
          }
        
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
