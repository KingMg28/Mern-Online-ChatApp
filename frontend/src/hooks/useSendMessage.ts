import { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { setMessage, selectedConversation } = useConversation();

  const sendMessage = (message: string) => {
    setIsLoading(true);

    axios
      .post(`/api/messages/send/${selectedConversation._id}`, {
        message,
      })
      .then((res) => {
        setMessage(res.data.newMessage);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setIsLoading(false);
      });
  };

  return { sendMessage, isLoading };
};

export default useSendMessage;
