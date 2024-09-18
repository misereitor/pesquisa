import { valideTokenUserAdminService } from '../../services/auth/user-admin/valide-token-user-admin-service';
import { createCategoryService } from '../../services/manage/category/category-services';
import { Category } from '../../types/category';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserAdminService(token);
    if (!valideToken) throw new Error('invalid token');
    const category: Category = JSON.parse(event.body);
    const createCategory = await createCategoryService(category);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: createCategory
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
