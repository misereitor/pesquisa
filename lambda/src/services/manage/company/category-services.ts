import { Category } from '../../../types/category';
import {
  createCategory,
  disableCategory,
  enableCategory,
  getAllCategory,
  getCategoryById,
  getCategoryByName,
  updateCategory
} from '../../queryDB/category';

export async function createCategoryService(category: Category) {
  try {
    const categoryExist = await getCategoryByName(category.name);
    if (!categoryExist) {
      return await createCategory(category);
    }
    if (!categoryExist.active) {
      await enableCategory(categoryExist.id);
      category.id = categoryExist.id;
      return await updateCategory(category);
    }
    return categoryExist;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getAllCategoryService() {
  try {
    const categories = await getAllCategory();
    return categories;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getCategoryByIdService(id: number) {
  try {
    const category = await getCategoryById(id);
    return category;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateCategoryService(category: Category) {
  try {
    const update = await updateCategory(category);
    return update;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function disableCategoryService(id: number) {
  try {
    await disableCategory(id);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
