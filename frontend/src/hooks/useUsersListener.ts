import { useSocketContext } from "@/context/SocketContext";
import { useEffect } from "react";
import useConversation from "./useConversations";

const useMessageListener = () => {
  const { socket } = useSocketContext();

  const {setConversations,conversations }  = useConversation()
 
  useEffect(() => {
    socket?.on("newUser", (newUser) => {
        setConversations([...conversations, newUser]);
    });

    return () => socket?.off("newMessage");
  }, [socket, conversations, setConversations]);
};

export default useMessageListener;
