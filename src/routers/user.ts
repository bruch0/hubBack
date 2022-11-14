import { Router } from 'express';

import * as userController from '@controllers/user';

const router = Router();

router.post('/signup', userController.signUp);

export default router;
