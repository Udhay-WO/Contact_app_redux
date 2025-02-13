/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({children}) => {
    const isAuthenticated = sessionStorage.getItem("authToken");
      return isAuthenticated ? children : <Navigate to="/" />
}
