import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SearchInput from "./SearchInput";
import { Separator } from "../ui/separator";
import UserItem from "./UserItem";
import LogoutButton from "./LogoutButton";

import { IConversation } from "@/typings";



interface IProps {
  conversations : IConversation[]
  filteredConversations : IConversation[]
}

const MobileSidebar = ({conversations,filteredConversations}:IProps) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={20} />
      </SheetTrigger>
      <SheetContent side={"left"}>
      <SearchInput />
        <Separator className="my-4" />
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
