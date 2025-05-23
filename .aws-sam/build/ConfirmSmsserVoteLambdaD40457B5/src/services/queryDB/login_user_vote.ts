import pool from '../../../config/db/config';
import { ConfirmedPhone } from '../../types/login_user_vote';

export async function createConfirmedLogin(confirmed: ConfirmedPhone) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      INSERT INTO confirmed_phone
      (phone, id_user, expiration_date, code)
        VALUES
      ($1, $2, $3, $4) RETURNING *
      `,
      values: [
        confirmed.phone,
        confirmed.id_user,
        confirmed.expiration_date,
        confirmed.code
      ]
    };
    const { rows } = await client.query(query);
    return rows[0] as unknown as ConfirmedPhone;
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function getConfirmationUserVote(phone: string, code: string) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      SELECT * FROM confirmed_phone WHERE phone like $1 and code like $2
      `,
      values: [phone, code]
    };
    const { rows } = await client.query(query);
    return rows[0] as unknown as ConfirmedPhone;
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function deleteCodeConfirmed(id: number) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      DELETE FROM confirmed_phone
        WHERE id = $1;
      `,
      values: [id]
    };
    await client.query(query);
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function deleteExpiredConfirmed() {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      DELETE FROM confirmed_phone
        WHERE expiration_date < CURRENT_DATE;
      `
    };
    await client.query(query);
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}
