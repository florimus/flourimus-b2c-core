import {
  CreateSSOUserRequestSchema,
  CreateUserRequestSchema,
  LoginSSOUserRequestSchema,
  LoginUserRequestSchema,
  ResetPasswordRequestSchema,
  UserUpdateRequestSchema,
} from '@core/schemas/user.schema';
import {
  forgotPassword,
  getUserInfo,
  loginSSOUser,
  loginUser,
  myInfo,
  registerSSOUser,
  registerUser,
  resetPassword,
  updateMyInfo,
  updateUserInfo,
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

router.post(
  '/reset-password/:token',
  limiter(5, 10 * 60),
  inspect(ResetPasswordRequestSchema),
  resetPassword
);

router.use('*', tokenValidator);

router.get('/', myInfo);

router.put('/me', updateMyInfo);

router.post('/forgot-password', limiter(3, 10 * 60), forgotPassword);

router.patch(
  '/:id/status',
  requestUserValidator,
  hasPermission('user_status_update'),
  userStatusUpdate
);

router.get(
  '/:id',
  requestUserValidator,
  hasPermission('user_info_view'),
  getUserInfo
);

router.put(
  '/:id',
  requestUserValidator,
  hasPermission('user_info_update'),
  inspect(UserUpdateRequestSchema),
  updateUserInfo
);

export default router.getRouter();
