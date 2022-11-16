import { Request, Response, NextFunction } from 'express';

import * as companyService from '@services/company';

const getUserCompanies = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    const userCompanies = await companyService.getUserCompanies({ userId: request.body.decoded.id });
    return response.status(200).send(userCompanies);
  } catch (error) {
    next(error);
  }
};

const createCompany = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    await companyService.createCompany(request.body);
    return response.status(201).send();
  } catch (error) {
    next(error);
  }
};

export { getUserCompanies, createCompany };
