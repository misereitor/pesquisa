import { confirmSMS } from '../../services/auth/auth-user-vote-services';

exports.handler = async (event: any) => {
  const { phone, code } = JSON.parse(event.body);

  try {
    const token = await confirmSMS(code, phone);
    return {
      statusCode: 200,
      body: JSON.stringify({
        tokens: token
      })
    };
  } catch (error: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Erro ao confirmar o código SMS.',
        errors: error.message
      })
    };
  }
};
