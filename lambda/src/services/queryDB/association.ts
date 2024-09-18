import pool from '../../../config/db/config';
import { AssociationCompanyAndCategory } from '../../types/association-company-category';

export async function createAssociationCategory(
  id_category: number,
  id_company: number
) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      INSERT INTO category_company_association
        (id_category, id_company)
      VALUES
        ($1, $2) 
      `,
      values: [id_category, id_company],
      rowMode: 'single'
    };
    await client.query(query);
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function getAllAssociation() {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      SELECT
        c.id AS id,
        c.name AS name,
        c.active AS active,
        c.date_create AS date_create,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', co.id,
            'trade_name', co.trade_name,
            'company_name', co.company_name,
            'cnpj', co.cnpj,
            'associate', co.associate,
            'active', co.active,
            'date_create', co.date_create
          )
        ) AS companies,
        cca.date_create AS association_date_create
    FROM category c
    JOIN category_company_association cca
      ON c.id = cca.id_category
    JOIN company co
      ON co.id = cca.id_company
    GROUP BY c.id, c.name, c.active, c.date_create, cca.date_create;
      `
    };
    const { rows } = await client.query(query);
    return rows as unknown as AssociationCompanyAndCategory[];
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function getAssociationByCategoryId(id: number) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      SELECT
        c.id AS id,
        c.name AS name,
        c.active AS active,
        c.date_create AS date_create,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', co.id,
            'trade_name', co.trade_name,
            'company_name', co.company_name,
            'cnpj', co.cnpj,
            'associate', co.associate,
            'active', co.active,
            'date_create', co.date_create
          )
        ) AS companies,
        cca.date_create AS association_date_create
    FROM category c
    JOIN category_company_association cca
      ON c.id = cca.id_category
    JOIN company co
      ON co.id = cca.id_company
    WHERE c.id = $1
    GROUP BY c.id, c.name, c.active, c.date_create, cca.date_create;
      `,
      values: [id],
      rowMode: 'single'
    };
    const { rows } = await client.query(query);
    return rows[0] as unknown as AssociationCompanyAndCategory;
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}

export async function deleteAssociation(
  id_category: number,
  id_company: number
) {
  const client = await pool.connect();
  try {
    const query = {
      text: `
      DELETE FROM category_company_association WHERE id_category = $1 and id_company = $2
      `,
      values: [id_category, id_company]
    };
    await client.query(query);
  } catch (e: any) {
    console.warn(e);
    throw new Error(e.message);
  } finally {
    client.release();
  }
}
