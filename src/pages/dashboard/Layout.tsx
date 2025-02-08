import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import {
  AuthenticationContext,
  User,
} from "../../lib/services/authenticationContext/authentication.context";
import { useContext } from "react";

const Layout = () => {
  const authContext = useContext(AuthenticationContext);

  if (!authContext || !authContext.user) {
    return <Navigate to="/login" />;
  }

  const user: User = authContext.user;

  return (
    <div className="dashboard bg-muted h-screen p-2">
      <Navbar user={user} />
      <main className="w-full">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
};

export default Layout;
