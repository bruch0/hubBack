import { Request, Response } from 'express';

const databaseError = (_: Request, response: Response): any => {
  response.status(500).send('Alguma coisa deu errada no banco');
};

export default databaseError;
