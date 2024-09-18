import { getAllCategoryService } from '../../services/manage/company/category-services';

exports.handler = async (event: any) => {
  console.log(event);
  try {
    const categories = await getAllCategoryService();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        categorias: categories
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
