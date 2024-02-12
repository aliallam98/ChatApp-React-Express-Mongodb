import { IConversation, IMessage } from "@/typings"
import {create} from "zustand"




type ConversationType = {
    selectedConversation : IConversation | null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedConversation : any

    messages : IMessage[]
    setMessages : (v:IMessage[])=>void


    conversations : IConversation[]
    setConversations : (v:IConversation[])=>void


    filteredConversations : IConversation[]
    setFilteredConversations : (v:IConversation[])=>void
}

const useConversation  = create<ConversationType>((set)=>({
    selectedConversation:null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedConversation: (v:any)=>set({
        selectedConversation:v
    }),

    messages:[],
    setMessages: (v)=>set({
        messages:v
    }),

    conversations:[],
    setConversations: (v)=>set({
        conversations:v
    }),

    filteredConversations:[],
    setFilteredConversations: (v)=>set({
        filteredConversations:v
    })
}))

export default useConversation