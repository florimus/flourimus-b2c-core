import { Router } from 'express';
import userRoutes from '@routes/users.routes';

const router = Router();

router.use('/users', userRoutes);

export default router;
