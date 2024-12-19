import { create } from "zustand";

export type User = {
  _id: string;
  fullname: string;
  username: string;
  profilePic: string;
  gender: "male" | "female";
};

export type MessageType = {
  _id: string;
  createdAt: string;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
  shouldShake?: boolean;
};

interface ConversationType {
  selectedConversation: User;
  setSelectedConversation: (selectedConversation: User) => void;
  messages: MessageType[];
  setMessage: (message: MessageType) => void;
  setAllMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationType>((set) => ({
  selectedConversation: "" as any,
  setSelectedConversation: (selectedConversation: User) =>
    set({ selectedConversation }),
  messages: [] as any,
  setMessage: (newMessage: MessageType) =>
    set((state) => ({
      messages: [...state.messages, newMessage],
    })),
  setAllMessages: (newMessages: MessageType[]) =>
    set((state) => ({
      messages: newMessages,
    })),
}));

export default useConversation;
