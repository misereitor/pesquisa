import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { getCategoryByIdService } from '../../services/manage/category/category-services';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const { id } = event.queryStringParameters;
    const category = await getCategoryByIdService(id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: category
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
