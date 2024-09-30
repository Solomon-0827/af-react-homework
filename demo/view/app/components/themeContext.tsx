

import React, { createContext, useContext, useState } from 'react';


interface UserContextType {
  background: string;
  setBackground: (color: string) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState('linear-gradient(90deg, #FC354C, #0ABFBC)'); 

  return (
    <UserContext.Provider value={{ background, setBackground }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};