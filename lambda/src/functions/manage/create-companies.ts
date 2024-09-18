import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { createCompaniesService } from '../../services/manage/company/company-services';
import { Company } from '../../types/company';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const company: Company[] = JSON.parse(event.body);
    await createCompaniesService(company);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success'
      })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'failed',
        error: error.message
      })
    };
  }
};
