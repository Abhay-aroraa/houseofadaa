import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (!role || role.toUpperCase() !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
