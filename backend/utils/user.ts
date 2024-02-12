import ErrorClass from "./ErrorClass";
import { NextFunction } from "express";
import { asyncHandler } from "./errorHandling";
import { IUser } from "../DB/models/User.Model";

  export const getOneById = (model:any) => {
    return asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      const isExist = await model.findById(id);
      if (!isExist) {
        return next(new ErrorClass("This Document is Not Exist", 404));
      }
      return res.status(200).json({success:true ,  message: "Done", results : isExist });
    });
  };

  export const deleteOneById = (model:any) => {
    return asyncHandler(async (req, res, next) => {
      const { id } = req.params;
      const isExist = await model.findByIdAndDelete(id);
      if (!isExist) {
        return next(new ErrorClass("This Document Is Not Exist", 404));
      }
  
  
      return res.status(200).json({success:true, message: "Deleted Successfully" });
    });
  };