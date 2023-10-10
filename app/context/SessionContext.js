import React, { createContext, useState } from "react";
export const SessionContext = createContext("A");

export default function SessionProvider({ children }) {
  const [user, setUser] = useState();
  const changeUser = (user) => {
    setUser(user);
  };
  return (
    <SessionContext.Provider value={{ user, changeUser }}>
      {children}
    </SessionContext.Provider>
  );
}
