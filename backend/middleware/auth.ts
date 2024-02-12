import { NextFunction, Request, Response } from "express";
import ErrorClass from "../utils/ErrorClass";
import { verifyToken } from "../utils/generateAndVerifyToken";
import userModel, { IUser } from "../DB/models/User.Model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}


export const auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { jwt:token } = req.cookies
      
      if (!token) {
        return next(new ErrorClass("Jwt Is Required", 401));
      }
      
      const decoded: any = verifyToken({ token });
      if (!decoded?.id) {
        return next(new ErrorClass("Invalid Payload Data", 401));
      }

      const user: IUser | null = await userModel.findById(decoded.id);
      if (!user) {
        return next(new ErrorClass("Not Registered Account", 404));
      }

      req.user = user;
      next();


    } catch (error: any) {
      return res.json({ message: "Catch error", err: error?.message });
    }
  };
};
