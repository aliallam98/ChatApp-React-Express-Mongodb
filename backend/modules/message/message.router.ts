import { Router } from "express";
import * as messageValidators from "./message.validators";
import * as messageController from "./message.controller";
import { auth } from "../../middleware/auth";
import { validation } from "../../middleware/validation";

const router = Router();



router.route("/:id").post(auth(),validation(messageValidators.sendMessage),messageController.sendMessage)
.get(auth(),validation(messageValidators.getMessages),messageController.getMessages)




export default router;