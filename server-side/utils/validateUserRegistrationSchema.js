import Joi from "joi";

const schema = Joi.object({
  firstName: Joi.string().required().min(5),
  lastName: Joi.string().required().min(5),
  userName: Joi.string().required().min(5),
  age: Joi.number().required(),
  role: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

export default (user) => {
  return schema.validate(user, { abortEarly: true });
};
