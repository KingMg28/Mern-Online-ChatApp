import useGetConversations from "../../hooks/useGetSidebarCoversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { isLoading, sidebarConversations } = useGetConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {isLoading && <span className=" loading loading-spinner"></span>}
      {sidebarConversations?.map((conversation, indexId) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          islastId={indexId === sidebarConversations.length - 1}
        />
      ))}
      {sidebarConversations.length === 0 && (
        <div className="flex items-center justify-center text-gray-400">
          <span className=" text-center">Search and Find Your Friends Strat Conversation</span>
        </div>
      )}
    </div>
  );
};

export default Conversations;
