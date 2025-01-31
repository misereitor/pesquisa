import { schemaAlterPassword } from '../../schema/user-admin';
import { updatePasswordUserAdminServices } from '../../services/user-admin/user-admin-services';
import { UserAdmin } from '../../types/user-admin';

exports.handler = async (event: any) => {
  try {
    const userAdmin: UserAdmin = JSON.parse(event.body);
    schemaAlterPassword.parse(userAdmin);
    await updatePasswordUserAdminServices(userAdmin);
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
