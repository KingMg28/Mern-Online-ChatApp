import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { messages, setAllMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = () => {
      setIsLoading(true);
      axios
        .get(`/api/messages/${selectedConversation._id}`)
        .then((res) => {
          setAllMessages(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          toast.error(err.message);
          setIsLoading(false);
        });
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setAllMessages]);
  return { isLoading, messages };
};

export default useGetMessages;
