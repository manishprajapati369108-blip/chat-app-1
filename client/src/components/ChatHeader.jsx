import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios.js";

const ChatHeader = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async() => {
      try {
      const response =  await api.get(`api/users/${userId}`);
      
       setUser(response.data);
      }catch (error) {
        console.log(error)
      }
    }
    fetchUser();
  }, [userId])

  return (
    <div className="font-[Nunito] flex flex-row items-center gap-5 mt-3 ml-3">
      <img src={user?.avatar} alt="User" className="w-10 rounded-4xl" />
      <p className="font-bold">{user?.name}</p>
    </div>
  );
};

export default ChatHeader;
