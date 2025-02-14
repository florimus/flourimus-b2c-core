import app from './server';

import config from '@config';

const PORT = config.PORT;

const startServer = async () =>
  app.listen(PORT, () => {
    console.log('Server is running on port 3000');
  });

startServer();

export default {
  startServer,
  app,
};
