import { Request, Response, NextFunction } from 'express';

import * as companyService from '@services/company';

const getUserCompanies = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    const userCompanies = await companyService.getUserCompanies({ userId: JSON.parse(request.headers.cookie!).id });
    return response.status(200).send(userCompanies);
  } catch (error) {
    next(error);
  }
};

const getCompanyDetails = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    const companyDetails = await companyService.getCompanyDetails({ companyId: Number(request.params.companyId) });
    return response.status(200).send(companyDetails);
  } catch (error) {
    next(error);
  }
};

const createCompany = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    await companyService.createCompany({ ...request.body, mainUserId: JSON.parse(request.headers.cookie!).id });
    return response.status(201).send();
  } catch (error) {
    next(error);
  }
};

const updateCompany = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    const companyDetails = await companyService.updateCompany({ ...request.body });
    return response.status(200).send(companyDetails);
  } catch (error) {
    next(error);
  }
};

const deleteCompany = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
  try {
    const companyDetails = await companyService.deleteCompany({
      ...request.body,
      userId: JSON.parse(request.headers.cookie!).id,
    });
    return response.status(200).send(companyDetails);
  } catch (error) {
    next(error);
  }
};

export { getUserCompanies, getCompanyDetails, createCompany, updateCompany, deleteCompany };
