import { schemaUserAdminRole } from '../../schema/user-admin';
import { updateRoleUserAdminService } from '../../services/user-admin/user-admin-services';
import { UserAdmin } from '../../types/user-admin';

exports.handler = async (event: any) => {
  try {
    const user: UserAdmin = JSON.parse(event.body);
    schemaUserAdminRole.parse(user);
    const userUpdate = await updateRoleUserAdminService(user);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        user: userUpdate
      })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Erro ao inicisar registro ou login.',
        error: error.message
      })
    };
  }
};
