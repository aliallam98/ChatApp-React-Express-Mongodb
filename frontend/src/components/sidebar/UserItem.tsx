import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useSocketContext } from "@/context/SocketContext";
import useConversation from "@/hooks/useConversations";

import { cn } from "@/lib/utils";
import { IConversation } from "@/typings";
import { Skeleton } from "../ui/skeleton";

interface IProps {
  conversation: IConversation;
}
const UserItem = ({ conversation }: IProps) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation?._id);

  return (
    <div
      role="button"
      onClick={() => setSelectedConversation(conversation)}
      className={cn(
        "flex items-center gap-2 rounded-md px-2",
        selectedConversation?._id === conversation._id && "bg-blue-200"
      )}
    >
      <div className="relative">
        <Avatar>
          <AvatarImage src={conversation.profileImage} />
          <AvatarFallback className="text-black">
            <span className="capitalize">
              {conversation.fullName.slice(0, 1)}
            </span>{" "}
            <span className="capitalize">
              {conversation.fullName.slice(-1)}
            </span>
          </AvatarFallback>
        </Avatar>
        {isOnline && (
          <Badge className="absolute bottom-0 -right-0.5 rounded-full w-3 h-3 bg-blue-400" />
        )}
      </div>
      <p>{conversation.userName}</p>
    </div>
  );
};

export default UserItem;

UserItem.Skeleton = function userItemSkeleton() {
  return (
    <div className="flex gap-4 mb-4 items-center">
      <Skeleton className="w-[40px] h-[40px] rounded-full bg-black/40" />
      <Skeleton className="w-[100px] h-[20px] rounded-md bg-black/40" />
    </div>
  );
};
