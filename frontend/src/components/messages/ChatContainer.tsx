import MessageInput from "./MessageInput";
import { useChatStore } from "../../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Chat";
import { useEffect, useRef } from "react";

const ChatContainer = () => {
  const {
    isMessagesLoading,
    messages,
    getMessages,
    selectedUser,
    listenToMessages,
    unlistenToMessages,
  } = useChatStore();

  const lastMessageRef = useRef<any>();

  useEffect(() => {
    getMessages();

    listenToMessages();

    return () => unlistenToMessages();
  }, [selectedUser?._id, getMessages, listenToMessages, unlistenToMessages]);

  useEffect(() => {
    if (lastMessageRef.current && messages) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isMessagesLoading && messages.length === 0) {
    return (
      <div className=" h-full flex flex-1 flex-col overflow-auto">
        <ChatHeader />
        <p className=" flex-1 text-center flex justify-center items-center">
          Send a message to start the conversation
        </p>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className=" h-full flex flex-1 flex-col overflow-auto">
      <ChatHeader />

      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className="px-4 flex-1 overflow-y-auto ">
          {messages.map((message) => (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
        </div>
      )}

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
