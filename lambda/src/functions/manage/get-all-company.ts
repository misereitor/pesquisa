import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { getAllCompanyService } from '../../services/manage/company/company-services';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const companies = await getAllCompanyService();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: companies
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
