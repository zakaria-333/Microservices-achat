import { useContext } from "react";
import AuthContext from "./AuthContext";
import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  console.log('User:', user);

  if (!user) {
    console.log('No user, redirecting to /login');
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role.nom)) {
    console.log(`User role ${user.role.nom} not authorized, redirecting to /unauthorized`);
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
