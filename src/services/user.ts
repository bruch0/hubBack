import { hashSync } from 'bcrypt';

import Error from '../errors/genericError';

import * as userSchema from './schemas/user';
import * as userRepository from '../repositories/user';

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
    throw new Error(errorMessage);
  }

  const available = await userRepository.getUsers({
    where: { email },
  });
  if (available[0].email.length === 0) throw new Error('Email já utilizado');

  const hashPassword = hashSync(password, 12);

  const user = await userRepository.createUser({
    data: { name, email, password: hashPassword, phone, address },
  });

  return user;
};

export { signUp };
