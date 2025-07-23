import { createContext,useState,useContext} from "react";


const AuthContext=createContext();

export const AuthProvider =({children}) =>{
    const[user,setuser] =useState(null);

    const login =(userData) =>{
        setuser(userData);
    };

    const logout =() =>{
        setuser(null);
    }
      const isAuthenticated = !!user;

    return(
        <AuthContext.Provider value={{ user,login, logout,isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=() => useContext(AuthContext);