import React, { createContext, useContext, ReactNode } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
return (
<AuthContext.Provider value={{}}>
{children}
</AuthContext.Provider>
);
};

export const useAuth = () => useContext(AuthContext);