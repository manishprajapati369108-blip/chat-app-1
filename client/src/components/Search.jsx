import api from "../utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import socket from "../socket/socket.jsx";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!search.trim()) {
        //setUsers([]);
        return;
      }
     
      const searchTerm = search;
      const params = new URLSearchParams({ q: searchTerm });
      const response = await api.get(`/api/users/search?${params}`);
      console.log(response.data);
      const data = response.data;
      setUsers(data);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const joinConversation = async(userId) => {
  try {
    const response = await api.post(`/conversation/direct/${userId}`)
    const conversationId = response.data._id;
    socket.emit("joinRoom", conversationId);
    return conversationId;
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-white dark:bg-neutral-800 outline-1 -outline-offset-1 outline-slate-300 dark:outline-neutral-700 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          className="size-4 fill-slate-400"
          aria-hidden="true"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="search"
          id="search"
          placeholder="Search..."
          required
          className="text-sm text-slate-900 dark:text-slate-50 w-full outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex justify-center p-4 flex-row ">
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {users.map((user) => (
            <ListItem
              className=" border border-amber-100 flex gap-4 mb-5"
              key={user._id}
              disableGutters
              secondaryAction={
                <IconButton
                  aria-label="comment"
                  onClick={async() => {
                    const conversationId = await joinConversation(user._id);
                    navigate(`/chat/${user._id}/${conversationId}`);
                  }}
                >
                  <CommentIcon />
                </IconButton>
              }
            >
              <img src={user.avatar} alt="✌️" className="w-10 rounded-4xl" />
              <ListItemText primary={`${user.name}`} className="ml-4" />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default Search;
