import { createContext,useState,useContext} from "react";
import {AuthContext} from '../../context/AuthContext';

const AuthContext=createContext();

export const AuthProvider =({children}) =>{
    const[user,setuser] =useState(null);

    const login =(userData) =>{
        setuser(userData);
    };

    const logout =() =>{
        setuser(null);
    }

    return(
        <AuthContext.Provider value={{ user,login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=() => useContext(AuthContext);