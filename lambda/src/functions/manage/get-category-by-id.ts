import { getCategoryByIdService } from '../../services/manage/company/category-services';

exports.handler = async (event: any) => {
  const { id } = event.queryStringParameters;
  try {
    const category = await getCategoryByIdService(id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        category: category
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
