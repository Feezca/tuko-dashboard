import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { Toaster } from "../../components/ui/toaster";

const AuthPage = () => {
  const [change, setChange] = useState<boolean>(false);

  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="w-full flex justify-center">
        {change ? (
          <Register isChange={() => setChange(false)} />
        ) : (
          <Login isChange={() => setChange(true)} />
        )}
      </div>
      <Toaster />
    </div>
  );
};
export default AuthPage;
