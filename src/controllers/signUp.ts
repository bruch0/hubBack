import { Request, Response, NextFunction } from 'express';

const signUp = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return response.send('signed!');
  } catch (error) {
    next(error);
  }
};

export { signUp };
