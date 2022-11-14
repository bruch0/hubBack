import { ErrorRequestHandler, Request, Response } from 'express';
import GenericError from '../errors/genericError';

const databaseError: ErrorRequestHandler = (error: GenericError, _: Request, response: Response, __: any) => {
  if (error instanceof GenericError) return response.status(error.status).send(error.message);

  return response.status(500).send('Something went wrong on our database');
};

export default databaseError;
