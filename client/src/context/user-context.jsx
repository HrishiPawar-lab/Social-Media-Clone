import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext({
  user: {},
});

const UserContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const changeUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser({});
    localStorage.clear();
  }

  return (
    <UserContext.Provider value={{ handleLogout, user, changeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;

export const useUserContext = () => {
  return useContext(UserContext);
};
