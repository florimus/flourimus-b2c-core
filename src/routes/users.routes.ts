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
import requestUserValidator from '@middleware/requestUserValidator';
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

router.use('*', tokenValidator);
router.use('*', requestUserValidator);

router.get('/', hasPermission('my_info'), myInfo);

export default router.getRouter();
