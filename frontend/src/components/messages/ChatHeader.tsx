import { X } from "lucide-react";
import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2 bg-gray-800 border-b border-slate-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser?.profilePic}
                alt={selectedUser?.username}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium text-gray-300 ">
              {selectedUser?.username}
            </h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.some((user) => user === selectedUser?._id)
                ? "Online"
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
