import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const { NODE_ENV, PORT, DB_URL, LOG_FORMAT, LOG_DIR, ORIGIN, CREDENTIALS, SECRET_KEY, WALLET_SECRET_KEY, API_KEY_ALCHEMY } = process.env;
