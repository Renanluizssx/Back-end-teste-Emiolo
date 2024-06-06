import { Router } from 'express';
import { googleAuthHandler } from './auth.controller';

const router = Router();

router.get('/auth/google', googleAuthHandler);

export default router;
