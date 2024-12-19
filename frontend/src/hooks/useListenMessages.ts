import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
  const SocketContext = useSocketContext();

  const { messages, setMessage } = useConversation();

  useEffect(() => {
    SocketContext?.socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessage(newMessage);
    });

    return () => {
      SocketContext?.socket?.off("newMessage");
    };
  }, [SocketContext?.socket, setMessage, messages]);
};

export default useListenMessages;
