import { valideTokenUserVoteService } from '../../../services/auth/user-vote/valide-token-user-vote-service';

exports.handler = async (event: any) => {
  try {
    const { token } = JSON.parse(event.body);
    const tokenLogin = valideTokenUserVoteService(token);
    return {
      statusCode: 200,
      body: JSON.stringify({
        decoden: tokenLogin
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
