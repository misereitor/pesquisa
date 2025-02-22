import pool from '../../../config/db/config';
import { Company } from '../../types/company';

export async function createCompany(company: Company) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      INSERT INTO company
        (trade_name, company_name, cnpj, associate)
      VALUES
        ($1, $2, $3, $4) RETURNING *
      `,
      values: [
        company.trade_name,
        company.company_name,
        company.cnpj,
        company.associate
      ],
      rowMode: 'single'
    };
    const { rows } = await client.query(query);
    return rows[0] as unknown as Company;
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function getAllCompany() {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT * FROM company WHERE active = TRUE'
    };
    const { rows } = await client.query(query);
    return rows as unknown as Company[];
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function getCompanyById(id: number) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT * FROM company WHERE id = ($1) AND active = TRUE',
      values: [id],
      rowMode: 'single'
    };

    const { rows } = await client.query(query);
    return rows[0] as unknown as Company;
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function getCompanyByCNPJ(cnpj: string) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'SELECT * FROM company WHERE cnpj like $1',
      values: [cnpj],
      rowMode: 'single'
    };
    const { rows } = await client.query(query);
    return rows[0] as unknown as Company;
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function updateCompany(company: Company) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      UPDATE company 
        SET trade_name = $1, company_name = $2, cnpj = $3, associate = $4 
      WHERE id = $5 RETURNING *
      `,
      values: [
        company.trade_name,
        company.company_name,
        company.cnpj,
        company.associate,
        company.id
      ],
      rowMode: 'single'
    };
    const { rows } = await client.query(query);
    return rows[0] as unknown as Company;
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function disableCompany(id: number) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE company SET active = FALSE WHERE id = $1',
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

export async function enableCompany(id: number) {
  const client = await pool.connect();
  try {
    const query = {
      text: 'UPDATE company SET active = TRUE WHERE id = $1',
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
