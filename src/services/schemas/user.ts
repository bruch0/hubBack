import joi from 'joi';

const signUp = joi.object({
  name: joi.string().required().min(3).max(30).required(),
  email: joi.string().required().email().required(),
  password: joi.string().required().min(8).max(50).required(),
  phone: joi.string().required().min(10).max(12).required(),
  address: joi.string().required().min(8).max(100).required(),
});

const signIn = joi.object({
  email: joi.string().required().email().required(),
  password: joi.string().required().min(8).max(50).required(),
});

export { signUp, signIn };
