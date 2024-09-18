import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { createAssociationByCategoryService } from '../../services/manage/association/association-services';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const { id_category, id_company } = JSON.parse(event.body);
    await createAssociationByCategoryService(id_category, id_company);
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
