import joi from "joi";
import { generalFields } from "../../middleware/validation";

export const sendMessage = {
  body: joi.object().required().keys({
    content: generalFields.name,
  }),
  files: generalFields.file,
  params: joi.object().required().keys({
    id: generalFields.id,
  }),
  query: joi.object().required().keys(),
};
export const getMessages = {
  body: joi.object().required().keys({}),
  files: generalFields.file,
  params: joi.object().required().keys({
    id: generalFields.id,
  }),
  query: joi.object().required().keys(),
};
