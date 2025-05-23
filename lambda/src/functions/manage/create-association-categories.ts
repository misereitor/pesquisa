import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { createAssociationByCategoryArrayService } from '../../services/manage/association/association-services';
import { AssociationCategoryAndCompany } from '../../types/association-company-category';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const association: AssociationCategoryAndCompany[] = JSON.parse(event.body);
    await createAssociationByCategoryArrayService(association);
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
