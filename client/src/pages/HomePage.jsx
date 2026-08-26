import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Chat from "../socket/socket.jsx";
const HomePage = () => {
  
  return (
    <div>
        <Navbar />
        <Chat />
        <Outlet />
    </div>
  )
}

export default HomePage;