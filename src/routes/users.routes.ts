import {
  CreateSSOUserRequestSchema,
  CreateUserRequestSchema,
  LoginSSOUserRequestSchema,
} from '@core/schemas/user.schema';
import {
  loginSSOUser,
  registerSSOUser,
  registerUser,
} from '@controller/user.controller';
import createRouter from '@core/router';
import inspect from '@middleware/requestInspect';

const router = createRouter();

router.post('/register', inspect(CreateUserRequestSchema), registerUser);

router.post(
  '/register-sso',
  inspect(CreateSSOUserRequestSchema),
  registerSSOUser
);

router.post('/login-sso', inspect(LoginSSOUserRequestSchema), loginSSOUser);

export default router.getRouter();
