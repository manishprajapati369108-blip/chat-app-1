import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { SocketContext } from "./SocketContext";

const useAuth = () => useContext(AuthContext);
const useSocket = () => useContext(SocketContext);

export { useAuth, useSocket };
