import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/useContext";
import TemporaryDrawer from "./Sidebar";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {
  const navigate = useNavigate();

  const { avatar, setAvatar } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/auth/me");
        setAvatar(response?.data?.user?.avatar);
      } catch (error) {
        console.log(error);
        console.log(error.response?.data?.error);
      }
    };
    fetchProfile();
  }, [setAvatar]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("auth/logout", {});

      if (response.data.success) {
        console.log(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      console.log(error.response?.data?.error);
    }
  };

  return (
    <div className="flex justify-center bg-blue-400 pt-3 pb-3 border-white rounded-b-xl border-2">

      <TemporaryDrawer />
      <PersonSearchIcon className="mt-1.5 ml-4" onClick={() => navigate("/search")}/>
     
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