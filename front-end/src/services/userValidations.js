import Joi from 'joi';

const minName = 12;
const minPassword = 6;

const schema = Joi.object({
  name: Joi.string()
    .min(minName)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(minPassword)
    .required(),
});

export default (obj) => schema.validate(obj);
