import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Search from "./components/Search.jsx";

import Chat from "./socket/socket.jsx";

const App = () => {
  return (
    <Routes>
      <Route element={<AuthPage />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/" element={<HomePage />}>
        <Route element={<Chat />} />
      </Route>

      <Route path="/search" element={<Search />} />
    </Routes>
  );
};

export default App;
