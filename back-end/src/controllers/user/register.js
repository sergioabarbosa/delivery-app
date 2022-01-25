const userService = require('../../services/user');
const { errors } = require('../../helpers');

module.exports = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const response = await userService.create({ name, email, password, role: 'customer' });
    if ('error' in response) return next(errors[response.error]);
    return res.status(201).json(response);
  } catch (e) {
    return next(e);
  }
};
