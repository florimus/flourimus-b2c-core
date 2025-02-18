import apiDocConfig from '@src/config/swaggerConfig';
import express from 'express';
import limiter from '@core/ratelimiter';
import routes from '@src/routes';

const app = express();
app.use(express.json());

app.use(limiter());

app.use(routes);
apiDocConfig(app);

export default app;
