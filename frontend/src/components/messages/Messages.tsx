import useGetMessage from "@/hooks/useGetMessage";
import MessageItem from "./MessageItem";
import useMessageListener from "@/hooks/useMessageListener";

const Messages = () => {
  const { messages, isLoading } = useGetMessage();
  console.log(isLoading);

  useMessageListener();

  if (isLoading) {
    return (
      <div className="h-full grow overflow-auto space-y-6">
        <div className="flex flex-row-reverse">
          <MessageItem.Skeleton />
        </div>
        <div className="flex flex-row-reverse">
          <MessageItem.Skeleton />
        </div>
        <MessageItem.Skeleton />
        <MessageItem.Skeleton />
        <div className="hidden lg:flex  flex-row-reverse">
          <MessageItem.Skeleton />
        </div>
        <div className="hidden lg:flex flex-row-reverse">
          <MessageItem.Skeleton />
        </div>
      </div>
    );
  }
  if (!isLoading && messages.length === 0) {
    return (
      <div className="h-full grow mb-5">
        <p className="text-center">Send A Message To Start The Conversation</p>
      </div>
    );
  }
  return (
    <div className="h-full grow overflow-auto">
      {messages.map((message, i) => (
        <MessageItem message={message} key={i} index={i} />
      ))}
    </div>
  );
};

export default Messages;
