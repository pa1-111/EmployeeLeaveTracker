import { createContext,useState,useContext} from "react";

const AuthContext=createContext();

export const AuthProvider =({children}) =>{
    const[User,setUser] =useState(null);

    const login =(userData) =>{
        setUser(userData);
    };

    const logout =() =>{
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{ User,login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth=() => useContext(AuthContext);