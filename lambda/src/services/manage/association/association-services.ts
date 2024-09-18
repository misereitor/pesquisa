import { AssociationCategoryAndCompany } from '../../../types/association-company-category';
import { createAssociationCategoriesBuildQuery } from '../../../util/query-builder';
import {
  createAssociationCategory,
  deleteAssociation,
  getAllAssociation,
  getAssociationByCategoryId
} from '../../queryDB/association';
import { queryCuston } from '../../queryDB/custom-query';

export async function createAssociationByCategoryService(
  id_category: number,
  id_company: number
) {
  try {
    await createAssociationCategory(id_category, id_company);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function createAssociationByCategoryArrayService(
  association: AssociationCategoryAndCompany[]
) {
  try {
    const query = createAssociationCategoriesBuildQuery(association);
    await queryCuston(query.text, []);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getAllAssociationService() {
  try {
    const associate = await getAllAssociation();
    return associate;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getAssociationByCategoryIdService(id_category: number) {
  try {
    const associate = await getAssociationByCategoryId(id_category);
    return associate;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function deleteAssociationService(
  id_category: number,
  id_company: number
) {
  try {
    await deleteAssociation(id_category, id_company);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
