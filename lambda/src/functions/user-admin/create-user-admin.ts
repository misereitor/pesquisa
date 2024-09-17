import { schemaAddUserAdmin } from '../../schema/user-admin';
import { createUserAdminServices } from '../../services/user-admin/user-admin-services';
import { UserAdmin } from '../../types/user-admin';

exports.handler = async (event: any) => {
  const userAdmin: UserAdmin = JSON.parse(event.body);
  try {
    schemaAddUserAdmin.parse(userAdmin);
    const createUser = await createUserAdminServices(userAdmin);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        User: createUser
      })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Erro ao criar usuário',
        error: error.message
      })
    };
  }
};
