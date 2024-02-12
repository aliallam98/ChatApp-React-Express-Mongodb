import useConversation from "@/hooks/useConversations";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import Title from "./Title";

const MessagesContainer = () => {
  const { selectedConversation } = useConversation();

  if (!selectedConversation)
    return (
      <div className="w-full h-full flex justify-center items-center text-center ">
        Hi There To Start A Chat Select A Conversation
      </div>
    );
  return (
    <div className="p-2 flex flex-col grow pt-10 ">
      <Title userName={selectedConversation.userName} />
      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessagesContainer;
