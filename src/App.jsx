import "./App.css";
import SignIn from "./component/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./component/SignUp";
import Popup from "./component/Popup";
import { PrivateRoute } from "./component/PrivateRoute";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route
            path="/contactform"
            element={
              <PrivateRoute>
                <Popup />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
