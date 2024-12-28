import { extractTime } from "../../utils/extractTime";
import { useAuthStore } from "../../store/useAuthStore";
import { MessageType, useChatStore } from "../../store/useChatStore";
import { useState } from "react";

const Message = ({ message }: { message: MessageType }) => {
  const { authUser } = useAuthStore();
  const { selectedUser } = useChatStore();

  const [imageLoaded, setImageLoaded] = useState(false);

  const fromSender = message?.senderId === authUser?._id;

  const dateExtract = extractTime(message?.createdAt);
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${fromSender ? "chat-end" : "chat-start"}`}>
      <div className=" chat-image avatar hidden md:block">
        <div className=" w-10 rounded-full ">
          <img
            src={fromSender ? authUser?.profilePic : selectedUser?.profilePic}
            alt="profile pic"
          />
        </div>
      </div>
      <div
        className={` chat-bubble flex flex-col text-white p-2 ${
          fromSender ? "bg-blue-500" : ""
        } ${shakeClass}`}
      >
        {message.image && (
          <img
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
            src={message.image}
            alt="Attachment"
            className=" sm:max-w-[200px] rounded-md mb-2"
          />
        )}
        {!imageLoaded && message.image && (
          <div className="skeleton h-48 w-48 "></div>
        )}
        {message.message && (
          <span className="">
            {message.message.split("").map((char, index) => (
              <span key={index}>
                {char}
                {(index + 1) % 19 === 0 && <br />}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className=" chat-footer opacity-50 text-xs flex gap-1 items-center">
        {dateExtract}
      </div>
    </div>
  );
};

export default Message;
