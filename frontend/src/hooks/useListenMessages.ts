import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";
import useGetConversations from "./useGetConversations";

const useListenMessages = () => {
  const SocketContext = useSocketContext();

  const { messages, setMessage, setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  useEffect(() => {
    SocketContext?.socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();

      const selectedConversation = conversations.find(
        (conversation) => conversation._id === newMessage?.senderId
      );
      if (selectedConversation) {
        setSelectedConversation(selectedConversation);
      }
      setMessage(newMessage);
    });

    return () => {
      SocketContext?.socket?.off("newMessage");
    };
  }, [SocketContext?.socket, setMessage, messages]);
};

export default useListenMessages;
