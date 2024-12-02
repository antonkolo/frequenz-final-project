import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

export const sslConfig = Boolean(process.env.POSTGRES_URL);

const option = {
  trasform: {
    ...postgres.camel,
    undefined: null,
  },

  ssl: sslConfig,
};

export default option;
