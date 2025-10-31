import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = localStorage.getItem("role"); // stored user info
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default AdminRoute;
