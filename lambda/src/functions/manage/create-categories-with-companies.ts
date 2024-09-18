import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { createCategoriesService } from '../../services/manage/category/category-services';
import { AssociationCompanyAndCategory } from '../../types/association-company-category';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const categories: AssociationCompanyAndCategory[] = JSON.parse(event.body);
    await createCategoriesService(categories);
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
