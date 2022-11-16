import { Request, Response, NextFunction } from 'express';

import * as companyService from '@services/company';

const getUserCompanies = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    await companyService.getUserCompanies(request.body);
    return response.status(201).send();
  } catch (error) {
    next(error);
  }
};

export { getUserCompanies };
