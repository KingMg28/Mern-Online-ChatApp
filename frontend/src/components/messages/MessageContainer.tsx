import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

import { TiMessages } from "react-icons/ti";
import { useAuth } from "../../context/AuthContext";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    return () => setSelectedConversation("" as any);
  }, [setSelectedConversation]);

  return (
    <div className=" w-full  2xl:min-w-[1050px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className=" bg-gray-800 px-4 py-2 border-b border-slate-700 ">
            <span className=" label-text text-white">To:</span>
            <span className=" text-gray-300 font-bold ps-2">
              {selectedConversation.username}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  const { auth } = useAuth();

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {auth?.username} ❄️</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className=" text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
