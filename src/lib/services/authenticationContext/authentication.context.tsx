import { createContext, useState, ReactNode } from "react";
import { fetchUserData } from "../action";

export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
  token: string;
}

interface AuthContextType {
  user: User | null;
  handleLogin: (userData: User & { accessToken: string }) => void;
  handleLogout: () => void;
  reloadUserData: () => Promise<void>;
}

export const AuthenticationContext = createContext<AuthContextType | undefined>(
  undefined
);

const userValue: User | null = JSON.parse(
  localStorage.getItem("user") || "null"
);

interface AuthenticationContextProviderProps {
  children: ReactNode;
}

export const AuthenticationContextProvider = ({
  children,
}: AuthenticationContextProviderProps) => {
  const [user, setUser] = useState<User | null>(userValue);

  const handleLogin = (userData: User & { accessToken: string }) => {
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  const reloadUserData = async () => {
    if (!user) return;
    try {
      const updatedUser = await fetchUserData(
        user.id,
        localStorage.getItem("token") || ""
      );
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error al recargar los datos del usuario:", error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, handleLogin, handleLogout, reloadUserData }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
