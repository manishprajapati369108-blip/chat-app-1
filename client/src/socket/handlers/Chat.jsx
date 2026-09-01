import { Outlet } from "react-router-dom";
import ChatHeader from "../../components/ChatHeader.jsx";
import ChatFooter from "../../components/ChatFooter.jsx"; 

const Chat = () => {
  //const handlesendMessage = () => {};

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0">
        <ChatHeader />
      </header>

      <main className="min-h-0 flex-1 overflow-y-auto">
        <Outlet />
      </main>

      <footer className="shrink-0">
        <ChatFooter />
      </footer>
    </div>
  );
};

export default Chat;
