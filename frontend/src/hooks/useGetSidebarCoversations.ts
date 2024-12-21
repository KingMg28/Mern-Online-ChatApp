import { useEffect, useState } from "react";
// import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import { User } from "../zustand/useConversation";
import axios from "axios";

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [sidebarConversations, setSidebarConversations] = useState(
    [] as User[]
  );

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      axios
        .get("/api/users/sidebar")
        .then((res) => {
          if (res.data.length === 0) {
            toast.error("No conversations found");
          }
          setSidebarConversations(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.message);
          setIsLoading(false);
        });
    };

    getConversations();
  }, []);

  return { isLoading, sidebarConversations };
};

export default useGetConversations;
