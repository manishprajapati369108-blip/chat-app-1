import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useContext";
import TemporaryDrawer from "./Sidebar";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Navbar = () => {
  const navigate = useNavigate();

  const { avatar, setAvatar, setCurrentUser } = useAuth();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("auth/logout", {});

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/login");
        setAvatar(null);
        setCurrentUser(null);
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.error);
    }
  };

  return (
    <div className="flex items-center w-full bg-blue-400 py-3 border-white rounded-b-xl border-2">

      <TemporaryDrawer />
      <PersonSearchIcon className=" ml-4 cursor-pointer" onClick={() => navigate("/search")}/>
     
      <NotificationsIcon  className="  sm: ml-auto -mr-20 lg:-mr-300"/>
      <button
        onClick={handleLogout}
        className="ml-auto mr-5 text-[18px] font-bold"
      >
        <LogoutIcon />
      </button>
      <img src={avatar} alt="Logo" className="w-10 h-10 mr-5 mt- rounded-4xl" />
    </div>
  );
};

export default Navbar;