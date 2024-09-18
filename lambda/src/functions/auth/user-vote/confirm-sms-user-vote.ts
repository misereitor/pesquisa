import { confirmSMS } from '../../../services/auth/user-vote/auth-user-vote-services';

exports.handler = async (event: any) => {
  const { phone, code } = JSON.parse(event.body);
  try {
    const token = await confirmSMS(code, phone);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: token
      })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'failed',
        errors: error.message
      })
    };
  }
};
