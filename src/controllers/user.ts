import { Request, Response, NextFunction } from 'express';

import * as userService from '@services/user';

const signUp = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    await userService.signUp(request.body);
    return response.status(201).send();
  } catch (error) {
    next(error);
  }
};

export { signUp };
