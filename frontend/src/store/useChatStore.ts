import { create } from "zustand";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import { useAuthStore, UserType } from "./useAuthStore";
import notificationSound from "../assets/sounds/notification.mp3";

export type MessageType = {
  _id: string;
  createdAt: string;
  message: string;
  image?: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
  shouldShake?: boolean;
};

interface ChatState {
  messages: MessageType[];
  users: UserType[];
  sidebarUsers: UserType[];
  searchedUsers: UserType[];
  selectedUser: UserType | null;
  isUsersLoading: boolean;
  isUsersSidbarLoading: boolean;
  isMessagesLoading: boolean;
  isMessageSending: boolean;

  getUsers: () => void;
  getSidebarUsers: () => void;
  SetSearchedUsers: (users: UserType[] | null) => void;
  getMessages: () => void;
  sendMessage: ({
    text,
    image,
  }: {
    text: string;
    image?: string | null;
  }) => void;
  listenToMessages: () => void;
  setSelectedUser: (selectedUser: UserType | null) => void;
  unlistenToMessages: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  users: [],
  sidebarUsers: [],
  searchedUsers: [],
  selectedUser: null,
  isUsersLoading: false,
  isUsersSidbarLoading: false,
  isMessagesLoading: false,
  isMessageSending: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await apiClient.get("/users");
      set({ users: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getSidebarUsers: async () => {
    set({ isUsersSidbarLoading: true });

    try {
      const res = await apiClient.get("/users/sidebar");
      set({ sidebarUsers: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersSidbarLoading: false });
    }
  },
  SetSearchedUsers: (users) => {
    set({ searchedUsers: users! });
  },
  getMessages: async () => {
    set({ isMessagesLoading: true });
    const { selectedUser } = get();
    try {
      const res = await apiClient.get(`/messages/${selectedUser?._id}`);
      set({ messages: res.data });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    set({ isMessageSending: true });
    const { selectedUser, messages } = get();
    try {
      const res = await apiClient.post(
        `/messages/send/${selectedUser?._id}`,
        messageData
      );
      set({ messages: [...messages, res.data.newMessage] });
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessageSending: false });
    }
  },
  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage: MessageType) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      if (newMessage.senderId === selectedUser._id)
        set({ messages: [...get().messages, newMessage] });
    });
  },
  unlistenToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
