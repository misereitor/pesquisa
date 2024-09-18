import { createCategoryService } from '../../services/manage/company/category-services';
import { Category } from '../../types/category';

exports.handler = async (event: any) => {
  const category: Category = JSON.parse(event.body);
  try {
    const createCategory = await createCategoryService(category);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        category: createCategory
      })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Erro ao criar usuário',
        error: error.message
      })
    };
  }
};
