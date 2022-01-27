import Joi from 'joi';

const MIN_NAME_LENGTH = 12;
const MIN_PASSWORD_LENGTH = 6;

const schema = Joi.object({
  name: Joi.string()
    .min(MIN_NAME_LENGTH)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(MIN_PASSWORD_LENGTH)
    .required(),
  role: Joi.string()
    .valid('customer', 'seller', 'administrator')
    .required(),
});

export default (obj) => schema.validate(obj);
