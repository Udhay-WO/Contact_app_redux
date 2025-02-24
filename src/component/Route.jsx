/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
export const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isLoggedIn");
  return isAuthenticated ? children : <Navigate to="/" />;
};
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("isLoggedIn");
  return isAuthenticated ? <Navigate to="/contactform" /> : children;
};
