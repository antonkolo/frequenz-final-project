import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

const option = {
  trasform: {
    ...postgres.camel,
    undefined: null,
  },
};

export default option;
