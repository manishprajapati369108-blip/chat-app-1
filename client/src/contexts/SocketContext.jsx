import { createContext } from "react";
import {useState} from "react";

const SocketContext = createContext();

const SocketProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState("")

    const value = {
        currentUser,
        setCurrentUser
    }

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )



}

export {SocketContext, SocketProvider}

