import { Router } from 'express';

import auth from '@middlewares/authentication';

import * as companyController from '@controllers/company';

const router = Router();

router.get('/companies', auth, companyController.getUserCompanies);
router.get('/companies/:companyId', auth, companyController.getCompanyDetails);
router.post('/companies', auth, companyController.createCompany);
router.put('/companies', auth, companyController.updateCompany);
router.delete('/companies', auth, companyController.deleteCompany);

export default router;
