import dotenv from 'dotenv';

let envFile: string | undefined;

if (process.env.NODE_ENV === 'test') {
  envFile = '.env.test';
} else if (process.env.NODE_ENV === 'dev') {
  envFile = '.env';
}

dotenv.config({
  path: envFile,
});
