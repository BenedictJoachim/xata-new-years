import {neon} from '@neondatabase/serverless'

export const sql = neon("postgresql://fitness_owner:o9EiBLCeZ4dS@ep-fancy-bread-a5haf8f6.us-east-2.aws.neon.tech/fitness?sslmode=require") 

/*
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password TEXT NOT NULL
);
*/