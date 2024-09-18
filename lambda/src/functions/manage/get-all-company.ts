import { getAllCompanyService } from '../../services/manage/category/company-services';

exports.handler = async (event: any) => {
  console.log('Event:', event);
  try {
    const companies = await getAllCompanyService();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        data: companies
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
