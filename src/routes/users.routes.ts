import {
  CreateSSOUserRequestSchema,
  CreateUserRequestSchema,
} from '@core/schemas/user.schema';
import { registerSSOUser, registerUser } from '@controller/user.controller';
import createRouter from '@core/router';
import inspect from '@middleware/requestInspect';

const router = createRouter();

router.post('/register', inspect(CreateUserRequestSchema), registerUser);

router.post(
  '/register-sso',
  inspect(CreateSSOUserRequestSchema),
  registerSSOUser
);

export default router.getRouter();
