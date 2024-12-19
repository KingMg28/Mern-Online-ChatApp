import { useAuth } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation, { MessageType } from "../../zustand/useConversation";

const Message = ({ messageContent }: { messageContent: MessageType }) => {
  const { auth } = useAuth();
  const { selectedConversation } = useConversation();

  const fromMe = messageContent?.senderId === auth?._id;

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? auth?.profilePic
    : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const dateExtract = extractTime(messageContent?.createdAt);
  const shakeClass = messageContent.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${chatClassName}`}>
      <div className=" chat-image avatar">
        <div className=" w-10 rounded-full">
          <img src={profilePic} alt="profile pic" />
        </div>
      </div>
      <div className={` chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {messageContent?.message}
      </div>
      <div className=" chat-footer opacity-50 text-xs flex gap-1 items-center">
        {dateExtract}
      </div>
    </div>
  );
};

export default Message;
