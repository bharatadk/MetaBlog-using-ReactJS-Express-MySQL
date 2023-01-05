import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { username: "" }
  );

  const login = async (inputs) => {
    console.log("handle submit");
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      inputs,
      { withCredentials: true }
    );
    setCurrentUser(res.data);
  };

  const logout = async (inputs) => {
    console.log("logout");

    localStorage.removeItem("user");

    const res = await axios.post(
      "http://localhost:5000/api/auth/logout",
      inputs,
      { withCredentials: true }
    );
    setCurrentUser({ username: "" });
    navigate("/");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
