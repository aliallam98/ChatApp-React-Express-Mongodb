import Sidebar from "./sidebar/Sidebar";
import MessagesContainer from "./messages/MessagesContainer";
import useGetConversation from "@/hooks/useGetConversation";

const ChatContainer = () => {
  const { conversations, isLoading } = useGetConversation();

  return (
    <div className="relative w-full h-full flex p-4    rounded-3xl bg-white/20  text-white backdrop-blur-sm">
      <Sidebar conversations={conversations} isLoading={isLoading} />
      <MessagesContainer />
    </div>
  );
};

export default ChatContainer;
