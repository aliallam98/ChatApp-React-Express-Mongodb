import SearchInput from "./SearchInput";
import { Separator } from "@/components/ui/separator";
import UserItem from "./UserItem";
import LogoutButton from "./LogoutButton";
import { IConversation } from "@/typings";
import useConversation from "@/hooks/useConversations";
import MobileSidebar from "./MobileSidebar";

interface IProps {
  conversations: IConversation[];
  isLoading: boolean;
}
const Sidebar = ({ conversations, isLoading }: IProps) => {
  const { filteredConversations } = useConversation();

  return (
    <>
      <div className="hidden lg:block w-64 border-r p-2 overflow-auto mb-10">
        <SearchInput />
        <Separator className="my-4" />
        {isLoading && (
          <>
            <UserItem.Skeleton />
            <UserItem.Skeleton />
            <UserItem.Skeleton />
            <UserItem.Skeleton />
          </>
        )}

        {filteredConversations.length > 0
          ? filteredConversations.map((conversation, i) => (
              <div key={conversation._id}>
                <UserItem key={conversation._id} conversation={conversation} />
                {conversations.length - 1 !== i && (
                  <Separator className="my-2" />
                )}
              </div>
            ))
          : conversations.map((conversation, i) => (
              <div key={conversation._id}>
                <UserItem key={conversation._id} conversation={conversation} />
                {conversations.length - 1 !== i && (
                  <Separator className="my-2" />
                )}
              </div>
            ))}
        <LogoutButton />
      </div>
      <div className="absolute lg:hidden">
        <MobileSidebar
          filteredConversations={filteredConversations}
          conversations={conversations}
        />
      </div>
    </>
  );
};

export default Sidebar;
