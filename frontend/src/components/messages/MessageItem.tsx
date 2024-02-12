import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext } from "@/context/AuthContext";
import useConversation from "@/hooks/useConversations";
import { cn, formatDateTime } from "@/lib/utils";
import { IMessage } from "@/typings";
import { ElementRef, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface IProps {
  message: IMessage;
  index: number;
}

const MessageItem = ({ message, index }: IProps) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const amISender = message.senderId === authUser?.id;
  const formattedDate = formatDateTime(message.createdAt).timeOnly;
  const lastIndexRef = useRef<ElementRef<"div">>(null);
  const shake = message.shake;

  useEffect(() => {
    setTimeout(() => {
      lastIndexRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [index]);

  return (
    <div
      className={cn(
        "flex items-center gap-2 mt-2 text-white",
        !amISender && "flex-row-reverse",
        shake && "shake"
      )}
      ref={lastIndexRef}
    >
      {amISender ? (
        <Avatar>
          <AvatarImage src={authUser.profileImage} />
          <AvatarFallback className="text-black">
            <span className="capitalize">{authUser.fullName.slice(0, 1)}</span>{" "}
            <span className="capitalize">{authUser.fullName.slice(-1)}</span>
          </AvatarFallback>
        </Avatar>
      ) : (
        <Avatar>
          <AvatarImage src={selectedConversation?.profileImage} />
          <AvatarFallback className="text-black">
            <span className="capitalize">
              {selectedConversation?.fullName.slice(0, 1)}
            </span>{" "}
            <span className="capitalize">
              {selectedConversation?.fullName.slice(-1)}
            </span>
          </AvatarFallback>
        </Avatar>
      )}
      <div className={cn("flex flex-col items-start ")}>
        <div
          className={cn(
            "max-w-[180px] sm:max-w-md md:max-w-lg break-words text-wrap py-1  w-fit gap-1 rounded-md  px-4",
            amISender ? "bg-black/40" : " items-end bg-white/30"
          )}
        >
          {message.content}
        </div>
        <span className="text-sm ">{formattedDate}</span>
      </div>
    </div>
  );
};

export default MessageItem;

MessageItem.Skeleton = function messageItemSkeleton() {
  return (
    <div className="flex gap-4">
      <div>
        <Skeleton className="w-[40px] h-[40px] rounded-full bg-black/40" />
      </div>
      <div>
        <Skeleton className="w-[200px] h-[20px] rounded-md bg-black/40" />
        <Skeleton className="w-[160px] h-[20px] rounded-md bg-black/40" />
      </div>
    </div>
  );
};
