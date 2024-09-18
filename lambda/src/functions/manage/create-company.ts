import { createCompanyService } from '../../services/manage/category/company-services';
import { Company } from '../../types/company';

exports.handler = async (event: any) => {
  const company: Company = JSON.parse(event.body);
  try {
    const createCompany = await createCompanyService(company);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        data: createCompany
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
