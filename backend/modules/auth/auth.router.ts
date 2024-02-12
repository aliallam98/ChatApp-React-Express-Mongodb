import { Router } from "express";
import * as authController from "./auth.controller";
import * as authValidators from "./auth.validators";
import { validation } from "../../middleware/validation";
import { auth } from "../../middleware/auth";




const router = Router();





router.post("/signup",validation(authValidators.signUp),authController.signUp)

router.post("/login", validation(authValidators.logIn), authController.logIn);

router.post("/logout", auth(),authController.logOut);




export default router;
