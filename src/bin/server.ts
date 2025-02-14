import apiDocConfig from '@src/config/swaggerConfig';
import express from 'express';
import routes from '@src/routes';

const app = express();
app.use(express.json());
app.use(routes);
apiDocConfig(app);

export default app;
