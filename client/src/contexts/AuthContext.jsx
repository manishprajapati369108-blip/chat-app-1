import { createContext, useState } from "react";


const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [avatar, setAvatar] = useState(null);

    const value = {
        setAvatar,
        avatar
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider}
