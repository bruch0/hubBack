import { Request, Response, NextFunction } from 'express';

import jwt from 'jsonwebtoken';

const authentication = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  const authHeader = request.headers.authorization;
  if (authHeader == null || !/Bearer [a-zA-Z0-9]/.test(authHeader)) return response.sendStatus(401);
  const token = authHeader.replace('Bearer ', '');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err != null || decoded === undefined) return response.sendStatus(401);

    request.headers.cookie = JSON.stringify(decoded);

    next();
  });
};

export default authentication;
