import {
  CreateSSOUserRequestSchema,
  CreateUserRequestSchema,
  LoginSSOUserRequestSchema,
  LoginUserRequestSchema,
} from '@core/schemas/user.schema';
import {
  loginSSOUser,
  loginUser,
  myInfo,
  registerSSOUser,
  registerUser,
} from '@controller/user.controller';
import createRouter from '@core/router';
import inspect from '@middleware/requestInspect';
import tokenValidator from '@middleware/tokenValidator';

const router = createRouter();

router.post('/register', inspect(CreateUserRequestSchema), registerUser);

router.post(
  '/register-sso',
  inspect(CreateSSOUserRequestSchema),
  registerSSOUser
);

router.post('/login-sso', inspect(LoginSSOUserRequestSchema), loginSSOUser);

router.post('/login', inspect(LoginUserRequestSchema), loginUser);

router.get('/', tokenValidator, myInfo);

export default router.getRouter();
