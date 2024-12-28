import { create } from "zustand";
import apiClient from "../services/apiClient";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export type UserType = {
  _id: string;
  email: string;
  fullname: string;
  username: string;
  profilePic: string;
  createdAt?: string;
  updatedAt?: string;
};

interface AuthState {
  authUser: UserType | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  socket: any;
  checkAuth: () => void;
  signup: (data: {
    username: string;
    email: string;
    fullname: string;
    password: string;
  }) => void;
  login: (data: { username: string; password: string }) => void;
  logout: () => void;
  updateProfile: (profilePicData: { profilePic: string }) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/" : "/";

export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await apiClient.get("/auth/check");

      if (res) set({ authUser: res.data });
      else set({ authUser: null });

      get().connectSocket();
    } catch (error: any) {
      console.log("Error in CheckAuth ", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await apiClient.post("/auth/signup", data);

      set({ authUser: res.data });
      toast.success("Account created successfully");

      get().connectSocket();
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await apiClient.post("/auth/login", data);

      set({ authUser: res.data });
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await apiClient.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");

      get().disconnectSocket();
    } catch (error: any) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await apiClient.put("/users/updateProfileImg", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log("error in update profile:", error);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });

    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket.connected) get().socket.disconnect();
  },
}));

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

// interface AuthState {
//   authUser: User | null;
//   isSigningUp: boolean;
//   isLoggingIn: boolean;
//   isUpdatingProfile: boolean;
//   isCheckingAuth: boolean;
//   onlineUsers: string[];
//   socket: any;
//   checkAuth: () => Promise<void>;
//   signup: (data: User) => Promise<void>;
//   login: (data: any) => Promise<void>;
//   logout: () => Promise<void>;
//   updateProfile: (data: User) => Promise<void>;
//   connectSocket: () => void;
//   disconnectSocket: () => void;
// }

// export const useAuthStore = create<AuthState>((set, get) => ({
//   authUser: null,
//   isSigningUp: false,
//   isLoggingIn: false,
//   isUpdatingProfile: false,
//   isCheckingAuth: true,
//   onlineUsers: [],
//   socket: null,

//   checkAuth: async () => {
//     try {
//       const res = await apiClien.get("/auth/check");

//       set({ authUser: res.data });
//       get().connectSocket();
//     } catch (error: any) {
//       console.log("Error in checkAuth:", error);
//       set({ authUser: null });
//     } finally {
//       set({ isCheckingAuth: false });
//     }
//   },

//   signup: async (data: User) => {
//     set({ isSigningUp: true });
//     try {
//       const res = await apiClien.post("/auth/signup", data);
//       set({ authUser: res.data });
//       toast.success("Account created successfully");
//       get().connectSocket();
//     } catch (error: any) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isSigningUp: false });
//     }
//   },

//   login: async (data) => {
//     set({ isLoggingIn: true });
//     try {
//       const res = await apiClien.post("/auth/login", data);
//       set({ authUser: res.data });
//       toast.success("Logged in successfully");

//       get().connectSocket();
//     } catch (error: any) {
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isLoggingIn: false });
//     }
//   },

//   logout: async () => {
//     try {
//       await apiClien.post("/auth/logout");
//       set({ authUser: null });
//       toast.success("Logged out successfully");
//       get().disconnectSocket();
//     } catch (error: any) {
//       toast.error(error.response.data.message);
//     }
//   },

//   updateProfile: async (data: User) => {
//     set({ isUpdatingProfile: true });
//     try {
//       const res = await apiClien.put("/auth/update-profile", data);
//       set({ authUser: res.data });
//       toast.success("Profile updated successfully");
//     } catch (error: any) {
//       console.log("error in update profile:", error);
//       toast.error(error.response.data.message);
//     } finally {
//       set({ isUpdatingProfile: false });
//     }
//   },

//   connectSocket: () => {
//     const { authUser } = get();
//     if (!authUser || get().socket?.connected) return;

//     const socket = io(BASE_URL, {
//       query: {
//         userId: authUser._id,
//       },
//     });
//     socket.connect();

//     set({ socket: socket });

//     socket.on("getOnlineUsers", (userIds) => {
//       set({ onlineUsers: userIds });
//     });
//   },
//   disconnectSocket: () => {
//     if (get().socket?.connected) get().socket.disconnect();
//   },
// }));
