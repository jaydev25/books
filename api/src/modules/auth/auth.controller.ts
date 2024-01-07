import userModel from './../../models/user.model';
import Joi from 'joi';

export const signup = async (req, res) => {
  const { body } = req;
  const userSchema = Joi.object().keys({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = userSchema.validate(body);
  const { error, value } = result;

  const valid = error == null;
  if (!valid) {
    res.status(422).json({
      message: 'Invalid request',
      error: error,
    });
  } else {
    try {
      const user = await userModel.create({
        email: value.email,
        password: value.password,
        profile: {
          firstName: value.firstName,
          lastName: value.lastName,
        },
      });
      res.json({ message: 'User created', data: user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
