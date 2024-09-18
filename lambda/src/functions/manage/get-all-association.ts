import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { getAllAssociationService } from '../../services/manage/association/association-services';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const associate = await getAllAssociationService();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: associate
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
