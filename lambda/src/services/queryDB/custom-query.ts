import pool from '../../../config/db/config';

export async function queryCuston(text: string, values: any) {
  const client = await pool.connect();
  try {
    const query = {
      text,
      values
    };
    const { rows } = await client.query(query);
    return rows[0];
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}
