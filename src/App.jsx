import "./App.css";
import SignIn from "./component/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./component/SignUp";
import Popup from "./component/Popup";
import { PrivateRoute, ProtectedRoute } from "./component/Route";
import PageNotFound from "./component/PageNotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/signup" element={
            <ProtectedRoute>
            <SignUp />
          </ProtectedRoute>} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contactform"
            element={
              <PrivateRoute>
                <Popup />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
