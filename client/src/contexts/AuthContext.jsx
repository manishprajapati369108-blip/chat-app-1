import { createContext, useState } from "react";
import { useEffect } from "react";
import api from "../utils/axios";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [avatar, setAvatar] = useState(null);
    const [currentUser, setCurrentUser] = useState("")
    useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/me");
        setAvatar(response?.data?.user?.avatar);
        setCurrentUser(response?.data?.user?._id)
      } catch (error) {
        console.log(error);
        console.log(error.response?.data?.error);
      }
    };
    fetchProfile();
  }, [setAvatar, setCurrentUser]);

    const value = {
        setAvatar,
        avatar,
        currentUser,
        setCurrentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
