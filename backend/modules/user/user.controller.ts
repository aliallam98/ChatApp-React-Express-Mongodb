import userModel from "../../DB/models/User.Model";
import { asyncHandler } from "../../utils/errorHandling";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  //except logged user
  const users = await userModel.find({
    _id: { $ne: req.user?._id },
  }).select("-password")
  return res.status(200).json({success:true, message: "Done", results:users });
});
