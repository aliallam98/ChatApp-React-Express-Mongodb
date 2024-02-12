import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "./useConversations";

const useGetConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    const getUserConversations = async () => {
      try {
        setIsLoading(true);
        await axios.get("api/user").then((res) => {
          setConversations(res.data.results);
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getUserConversations();
  }, [setConversations]);
  return { isLoading, conversations, setConversations };
};

export default useGetConversation;
