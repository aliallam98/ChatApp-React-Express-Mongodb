import conversationModel, {IConversation,} from "../../DB/models/Conversation.Model";
import messageModel, { IMessage } from "../../DB/models/Message.Model";
import { getReceiverId, io } from "../../socket/socket";
import { asyncHandler } from "../../utils/errorHandling";

export const sendMessage = asyncHandler(async (req, res, next) => {
  const senderId = req.user?._id;
  const receiverId = req.params.id;

  let conversation: IConversation | null = await conversationModel.findOne({
    participants: {
      $all: [senderId, receiverId],
    },
  });
  if (!conversation) {
    conversation = await conversationModel.create({
      participants: [senderId, receiverId],
    });
  }

  const newMessage: IMessage | null = await messageModel.create({
    content: req.body.content,
    senderId,
    receiverId,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    conversation?.save();
  }
  const socketId = getReceiverId(receiverId)
  if(socketId) {
    io.to(socketId).emit("newMessage", newMessage)
  }

  return res
    .status(200)
    .json({ success: true, message: "Done", results: newMessage });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const { id: userToChatId } = req.params;
  const senderId = req.user?._id;

  const conversation: IConversation | null = await conversationModel
    .findOne({
      participants: {
        $all: [senderId, userToChatId],
      },
    })
    .populate("messages");
    

  if (!conversation) return res.status(200).json({ success: true, message: "Done", results: [] });

  const messages = conversation.messages;
  return res
    .status(200)
    .json({ success: true, message: "Done", results: messages });
});
