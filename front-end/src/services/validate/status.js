import Joi from 'joi';

const schema = Joi.string()
  .valid('Pendente', 'Preparando', 'Em Trânsito', 'Entregue')
  .required();

export default (obj) => schema.validate(obj);
