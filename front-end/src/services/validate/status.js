import Joi from 'joi';

const schema = Joi.string()
  .valid('Pendente', 'Preparando', 'Em Trânsito', 'Entregue')
  .required();

export default (str) => schema.validate(str);
