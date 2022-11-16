import { Router } from 'express';

import * as companyController from '@controllers/company';

const router = Router();

router.post('/companies', companyController.getUserCompanies);

export default router;
