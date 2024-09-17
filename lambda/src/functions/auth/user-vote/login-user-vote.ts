import { schemaUserVote } from '../../../schema/user-vote';
import { createUserAndSendSMS } from '../../../services/auth/user-vote/auth-user-vote-services';
import { UserVote } from '../../../types/user-vote';

exports.handler = async (event: any) => {
  try {
    const userVote: UserVote = JSON.parse(event.body);
    schemaUserVote.parse(userVote);
    const createUser = await createUserAndSendSMS(userVote);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Login iniciado',
        createUser
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
