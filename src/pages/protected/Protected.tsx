import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthenticationContext } from "../../lib/services/authenticationContext/authentication.context";

const Protected = () => {
  const authContext = useContext(AuthenticationContext);

  if (!authContext || !authContext.user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default Protected;
