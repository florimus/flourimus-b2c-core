import { CreateUserRequestSchema } from '@core/schemas/user.schema';
import createRouter from '@core/router';
import inspect from '@middleware/requestInspect';
import { registerUser } from '@controller/user.controller';

const router = createRouter();

router.post('/', inspect(CreateUserRequestSchema), registerUser);

export default router.getRouter();
