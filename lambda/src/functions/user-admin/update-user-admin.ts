import { schemaUpdateUserAdmin } from '../../schema/user-admin';
import { updateUserAdminServices } from '../../services/user-admin/user-admin-services';

exports.handler = async (event: any) => {
  try {
    const user = JSON.parse(event.body);
    schemaUpdateUserAdmin.parse(user);
    const updateUser = await updateUserAdminServices(user);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: updateUser
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
