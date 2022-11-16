import { Router } from 'express';

import * as userController from '@controllers/user';

const router = Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

export default router;
