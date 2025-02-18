import {
  CreateSSOUserRequestSchema,
  CreateUserRequestSchema,
  LoginSSOUserRequestSchema,
  LoginUserRequestSchema,
} from '@core/schemas/user.schema';
import {
  getUserInfo,
  loginSSOUser,
  loginUser,
  myInfo,
  registerSSOUser,
  registerUser,
  userStatusUpdate,
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

router.post(
  '/login-sso',
  limiter(5, 10 * 60),
  inspect(LoginSSOUserRequestSchema),
  loginSSOUser
);

router.post(
  '/login',
  limiter(5, 10 * 60),
  inspect(LoginUserRequestSchema),
  loginUser
);

// Authenticated routes
router.use('*', tokenValidator);
router.use('*', requestUserValidator);

router.get('/', hasPermission('my_info'), myInfo);

router.patch(
  '/:id/status',
  hasPermission('user_status_update'),
  userStatusUpdate
);

router.get('/:id', hasPermission('user_info_view'), getUserInfo);

export default router.getRouter();
