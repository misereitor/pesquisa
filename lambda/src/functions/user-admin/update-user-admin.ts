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
        message: 'Usuário atualizado',
        user: updateUser
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
