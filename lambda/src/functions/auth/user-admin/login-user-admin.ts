import { loginUserAdminService } from '../../../services/auth/user-admin/auth-user-admin-services';

exports.handler = async (event: any) => {
  try {
    const { username, password } = JSON.parse(event.body);
    const tokenLogin = await loginUserAdminService(username, password);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: tokenLogin
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
