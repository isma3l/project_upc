import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_DATABASE, LOG_FORMAT, LOG_DIR, ORIGIN, CREDENTIALS, SECRET_KEY } = process.env;
