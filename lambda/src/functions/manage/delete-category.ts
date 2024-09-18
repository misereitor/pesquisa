import { disableCategoryService } from '../../services/manage/company/category-services';

exports.handler = async (event: any) => {
  const { id } = event.pathParameters;
  try {
    await disableCategoryService(id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado'
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
