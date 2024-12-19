import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");

  const { isLoading, sendMessage } = useSendMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
    }
    setMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative ">
        <input
          type="text"
          className="input input-bordered border text-sm rounded-lg block w-full p-2.5 bg-gray-800 border-gray-700 text-white "
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className=" absolute inset-y-0 end-0 flex items-center pe-4"
        >
          {isLoading ? (
            <span className=" loading loading-spinner"></span>
          ) : (
            <div className=" border p-2 rounded-badge border-gray-700">
              <BsSend />
            </div>
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
