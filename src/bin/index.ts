import Logger from '@core/logger';
import app from './server';
import config from '@config';
import { getCurrentTime } from '@core/utils/time.utils';
import mongoose from 'mongoose';

const PORT = config.PORT;
const MONGO_URI = config.MONGO_URI!;

/**
 * Asynchronously starts the server by connecting to the MongoDB database.
 * Once the connection is established, the server listens on the specified port.
 *
 * @returns {Promise<void>} A promise that resolves when the server has started.
 */
const startServer = async () =>
  mongoose.connect(MONGO_URI).then(() => {
    app.listen(PORT, () =>
      Logger.info(`B2c server started at ${getCurrentTime()}`)
    );
  });

startServer();

export default {
  startServer,
  app,
};
