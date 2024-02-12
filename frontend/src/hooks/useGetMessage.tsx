import useConversation from "@/hooks/useConversations";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";




const useGetMessage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();
    
    useEffect(()=>{
        const getMessages = async()=>{
            setIsLoading(true)
            await axios.get(`/api/message/${selectedConversation?._id}`).then((res)=>{
                setMessages(res.data.results);
            }).catch((error)=>{
                toast.error(error.message);
            }).finally(
               ()=> setIsLoading(false)
            )
        }



        if (selectedConversation?._id) getMessages();
    },[selectedConversation?._id,setMessages])
   return { messages, isLoading };
}

export default useGetMessage
