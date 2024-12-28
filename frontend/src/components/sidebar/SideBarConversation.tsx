import { useAuthStore, UserType } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";

interface Props {
  conversation: UserType;
  islastId: boolean;
}

const SideBarConversation = ({ conversation, islastId }: Props) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  const isSelected = selectedUser?._id === conversation._id;

  const isOnline = onlineUsers.includes(conversation._id) ?? false;

  return (
    <>
      <div
        className={`flex gap-2 items-center  rounded p-1 py-1 cursor-pointer  md:p-2
        ${isSelected && "bg-slate-700"}  `}
        onClick={() => setSelectedUser(conversation)}
      >
        <div className={` avatar ${isOnline && "online"}`}>
          <div className="w-8 rounded-full md:w-12">
            <img src={conversation.profilePic} alt={conversation.username} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-4 justify-between">
            <p className=" font-bold text-gray-300 hidden sm:block ">
              {conversation.username}
            </p>
          </div>
          <span className=" hidden md:block text-xs text-gray-500">
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>
      </div>
      {!islastId && <div className=" divider my-0 py-0 h-1  " />}
    </>
  );
};

export default SideBarConversation;
