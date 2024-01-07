import userModel, { comparePassword } from './../../models/user.model';
import Joi from 'joi';
import { createUser, getUserWithEmail } from './auth.service';

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
    const { data, error } = await createUser(value);

    if (error) {
      return res.status(500).json({ error });
    }
    return res.json({ message: 'User created!', data });
  }
};

export const login = async (req, res) => {
  const { body } = req;
  const userSchema = Joi.object().keys({
    email: Joi.string().required(),
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
    const { data, error } = await getUserWithEmail(value.email);

    if (error) {
      return res.status(500).json({
        error: 'Invalid credentials!',
      });
    }

    if (data && comparePassword(value.password, data.password)) {
      return res.json({
        message: 'User authenticated successfully',
        data: {
          token: 'token',
        },
      });
    } else {
      return res.status(500).json({
        error: 'Invalid credentials!',
      });
    }
  }
};
