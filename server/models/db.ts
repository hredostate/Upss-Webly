import pg from 'pg';
const { Pool } = pg;

// Assumption: process.env.DATABASE_URL is set
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export default pool;