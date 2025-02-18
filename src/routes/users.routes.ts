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
import hasPermission from '@middleware/permissionValidator';
import inspect from '@middleware/requestInspect';
import limiter from '@core/ratelimiter';
import requestUserValidator from '@middleware/requestUserValidator';
import tokenValidator from '@middleware/tokenValidator';

const router = createRouter();

router.post(
  '/register',
  limiter(1),
  inspect(CreateUserRequestSchema),
  registerUser
);

router.post(
  '/register-sso',
  limiter(1),
  inspect(CreateSSOUserRequestSchema),
  registerSSOUser
);

router.post('/login-sso', limiter(5, 10 * 60), inspect(LoginSSOUserRequestSchema), loginSSOUser);

router.post('/login', limiter(5, 10 * 60), inspect(LoginUserRequestSchema), loginUser);

router.use('*', tokenValidator);
router.use('*', requestUserValidator);

router.get('/', hasPermission('my_info'), myInfo);

export default router.getRouter();
