import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { isLoading, conversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {isLoading && <span className=" loading loading-spinner"></span>}
      {conversations?.map((conversation, indexId) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          islastId={indexId === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
