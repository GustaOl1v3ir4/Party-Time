import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />
  }

  return children;
};

export default AdminRoute;