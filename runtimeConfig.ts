import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  LOG_LEVEL: process.env.LOG_LEVEL,
};
