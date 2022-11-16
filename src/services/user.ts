import { hashSync, compareSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

import Error from '@errors/genericError';

import * as userSchema from '@services/schemas/user';
import * as userRepository from '@repositories/user';

const signUp = async ({
  name,
  email,
  password,
  phone,
  address,
}: {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}): Promise<any> => {
  const validation = userSchema.signUp.validate({
    name,
    email,
    password,
    phone,
    address,
  });

  if (validation.error != null) {
    const errorMessage = validation.error.details[0].message;
    throw new Error('bodyValidation', errorMessage, 400);
  }

  const available = await userRepository.getOneUser({
    where: { email },
  });
  if (available != null) throw new Error('emailAlreadyInUse', 'Email already in use', 403);

  const hashPassword = hashSync(password, 12);

  await userRepository.createUser({
    data: { name, email, password: hashPassword, phone, address },
  });
};

const signIn = async ({ email, password }: { email: string; password: string }): Promise<any> => {
  const validation = userSchema.signIn.validate({
    email,
    password,
  });

  if (validation.error != null) {
    const errorMessage = validation.error.details[0].message;
    throw new Error('bodyValidation', errorMessage, 400);
  }

  const user = await userRepository.getOneUser({ where: { email } });
  if (user == null) throw new Error('userNotFound', 'User not found', 404);

  const correctPassword = compareSync(password, user.password);
  if (!correctPassword) throw new Error('wrongPassword', 'Incorrect password', 401);

  const sessionToken = jwt.sign(
    {
      ...user,
      password: null,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 }
  );

  return sessionToken;
};

export { signUp, signIn };
