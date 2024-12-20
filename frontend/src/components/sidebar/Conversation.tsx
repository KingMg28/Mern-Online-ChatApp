import { useSocketContext } from "../../context/SocketContext";
import useConversation, { User } from "../../zustand/useConversation";

const Conversation = ({
  conversation,
  islastId,
  emoji,
}: {
  conversation: User;
  emoji: string;
  islastId: boolean;
}) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation._id === conversation._id;

  const socketContext = useSocketContext();
  const isOnline = socketContext?.onlineUsers.includes(conversation._id) ?? false;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-1 py-1 cursor-pointer  md:p-2
        ${isSelected && "bg-sky-500"}  `}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={` avatar ${isOnline && "online" }`}>
          <div className="w-8 rounded-full md:w-12">
            <img src={conversation.profilePic} alt={conversation.username} />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-4 justify-between">
            <p className=" font-bold text-gray-200 hidden sm:block ">{conversation.username}</p>
            <span className=" text-xl hidden sm:block">{emoji}</span>
          </div>
        </div>
      </div>
      {!islastId && <div className=" divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
