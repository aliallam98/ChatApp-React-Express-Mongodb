export interface IConversation {
  _id: string;
  fullName: string;
  userName: string;
  profileImage: string;
  gender: string;
  createdAt: string 
  updatedAt: string 
  __v: number;
}
export interface IMessage {
  _id: string
  content: string
  receiverId: string
  senderId: string
  createdAt: string 
  updatedAt: string 
  __v: number
  shake?: boolean
}
