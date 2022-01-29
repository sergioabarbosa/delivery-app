import Joi from 'joi';

const schema = Joi.object({
  userId: Joi.number()
    .integer()
    .positive()
    .required(),
  sellerId: Joi.number()
    .integer()
    .positive()
    .required(),
  totalPrice: Joi.number()
    .precision(2)
    .positive()
    .required(),
  deliveryAddress: Joi.string()
    .required(),
  deliveryNumber: Joi.string()
    .required(),
  products: Joi.array()
    .items(Joi.object({
      id: Joi.number()
        .integer()
        .positive()
        .required(),
      quantity: Joi.number()
        .integer()
        .positive()
        .required(),
    }))
    .unique((a, b) => a.id === b.id)
    .required(),
});

export default (obj) => schema.validate(obj);
