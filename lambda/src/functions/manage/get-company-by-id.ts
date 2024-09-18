import { getCompanyByIdService } from '../../services/manage/category/company-services';

exports.handler = async (event: any) => {
  const { id } = event.queryStringParameters;
  try {
    const company = await getCompanyByIdService(id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        data: company
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
