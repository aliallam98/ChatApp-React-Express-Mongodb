import userModel, { IUser } from "../../DB/models/User.Model";
import { io } from "../../socket/socket";
import ErrorClass from "../../utils/ErrorClass";
import { asyncHandler } from "../../utils/errorHandling";
import { generateToken } from "../../utils/generateAndVerifyToken";
import { compare, hash } from "../../utils/hashAndCompare";

export const signUp = asyncHandler(async (req, res, next) => {
  //Receive Data from body
  

  //Check if  username existing in db or not
  const isUsernameExist = await userModel.findOne({
    userName: req.body.userName,
  });
  if (isUsernameExist)
    return next(new ErrorClass("This Username Already In Use", 409));

  //Hash Password
  req.body.password = hash({ plaintext: req.body.password });

  const profileImage = req.body.gender === "Male"
    ? "https://avatar.iran.liara.run/public/36"
    : "https://avatar.iran.liara.run/public/78"

  const newUser = await userModel.create({
    ...req.body,
    profileImage,
  });

  if(newUser){
    io.emit("newUser", newUser)
  }

  return res
    .status(201)
    .json({ success: true, message: "User Has Created", results: newUser });
});

export const logIn = asyncHandler(async (req, res, next) => {
  //Receive Data from body
  let { userName, password } = req.body;

  //Check isEmailExist
  const isUsernameExist: IUser | null = await userModel.findOne({ userName });
  if (!isUsernameExist)
    return next(new ErrorClass("Username Or Password Is Wrong", 401));

  //Check IsValidPassword
  const IsValidPassword = compare({
    plaintext: password,
    hashValue: isUsernameExist.password,
  });

  if (!IsValidPassword)
    return next(new ErrorClass("Username Or Password Is Wrong", 401));

  // General Payload and Token
  const payload = {
    id: isUsernameExist._id,
    fullName: isUsernameExist.fullName,
    userName: isUsernameExist.userName,
    profileImage:isUsernameExist.profileImage,
  };

  // Jwt
  const token = generateToken({ payload });

  // in case needs to use cookie
  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7, // MM
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  return res.status(200).json({ success: true, message: "Logged In",results : payload });
});

export const logOut = asyncHandler(async (req, res, next) => {
  res.clearCookie("jwt");

  return res.status(200).json({ success: true, message: "Logged Out" });
});
