import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
  MONGO_URI: process.env.MONGO_URI,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
};
