import { disableCompanyService } from '../../services/manage/category/company-services';

exports.handler = async (event: any) => {
  const { id } = event.pathParameters;
  try {
    await disableCompanyService(id);
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
