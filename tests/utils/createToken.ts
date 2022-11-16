import jwt from 'jsonwebtoken';
import createUser from './createUser';

const createToken = async (customId?: number): Promise<string> => {
  const user = await createUser();

  const sessionToken = jwt.sign(
    {
      ...user,
      password: null,
      id: customId ?? user.id,
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 }
  );

  return sessionToken;
};

export default createToken;
