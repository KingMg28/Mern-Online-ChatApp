import { useEffect, useState } from "react";
// import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import { User } from "../zustand/useConversation";
import axios from "axios";

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [conversations, setConversations] = useState([] as User[]);

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      axios
        .get("/api/users")
        .then((res) => {
          setConversations(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setIsLoading(false);
        });
    };

    getConversations();
  }, []);

  return { isLoading, conversations };
};

export default useGetConversations;
