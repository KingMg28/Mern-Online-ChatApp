import  { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { isLoading, messages } = useGetMessages();

  const lastMessageRef = useRef<any>();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!isLoading &&
        messages.map((message, index) => (
          <div key={index} ref={lastMessageRef}>
            <Message messageContent={message} />
          </div>
        ))}

      {isLoading && (
        <>
          <MessageSkeleton />
          <MessageSkeleton />
          <MessageSkeleton />
        </>
      )}

      {!isLoading && messages.length === 0 && (
        <p className="  text-center">
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};

export default Messages;
