import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { disableCompanyService } from '../../services/manage/company/company-services';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const { id } = event.pathParameters;
    await disableCompanyService(id);
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
