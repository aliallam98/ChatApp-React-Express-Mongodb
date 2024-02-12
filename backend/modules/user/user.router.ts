import { Router } from "express";
import * as userController from "./user.controller";
import { auth } from "../../middleware/auth";


const router = Router();



router.get("/",auth(),userController.getAllUsers);  









export default router;