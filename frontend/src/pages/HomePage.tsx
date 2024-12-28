import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatContainer from "../components/messages/ChatContainer";
import Sidebar from "../components/sidebar/Sidebar";
import NoChatSelected from "../components/messages/NoChatSelected";

const Home = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  useEffect(() => {
    return () => setSelectedUser(null);
  }, [setSelectedUser]);
  return (
    <div className="h-screen bg-base-100">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100  shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className=" flex h-full rounded-lg overflow-hidden shadow-2xl  border border-solid border-gray-700 ">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
