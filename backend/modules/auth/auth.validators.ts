import joi from "joi";
import { generalFields } from "../../middleware/validation";

export const signUp = {
  body: joi.object().required().keys({
    fullName: generalFields.name.min(2).max(50),
    userName: generalFields.name.min(3).max(50),
    password: joi.string().min(6).max(30).required(),
    gender:joi.string().valid("Male","Female")
  }),
  files: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};

export const logIn = {
  body: joi.object().required().keys({
    userName:generalFields.name,
    password:joi.string().required()
  }),
  file: generalFields.file,
  params: joi.object().required().keys(),
  query: joi.object().required().keys(),
};



