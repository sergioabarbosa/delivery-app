import Joi from 'joi';

const minPassword = 6;

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(minPassword)
    .required(),
});

export default (obj) => schema.validate(obj);
