import { useSocketContext } from "@/context/SocketContext";
import useConversation from "./useConversations";
import { useEffect } from "react";
import soundEffect from "../assets/sounds/notification.mp3";

const useMessageListener = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessages) => {
        console.log(newMessages);
        
      newMessages.shake = true;
      const sound = new Audio(soundEffect);
      sound.play();
      setMessages([...messages, newMessages]);
    });

    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useMessageListener;
