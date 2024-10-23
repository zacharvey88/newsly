import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/User";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user || !user.username) {
    return <Navigate to="/login" state={{ from: location, message: "You must log in first" }} />;
  }

  return children;
};

export default ProtectedRoute;
