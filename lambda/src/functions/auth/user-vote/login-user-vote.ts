import { schemaUserVote } from '../../../schema/user-vote';
import { createUserAndSendMessage } from '../../../services/auth/user-vote/auth-user-vote-services';
import { UserVote } from '../../../types/user-vote';

exports.handler = async (event: any) => {
  try {
    const { type } = event.queryStringParameters;
    const userVote: UserVote = JSON.parse(event.body);
    schemaUserVote.parse(userVote);
    const createUser = await createUserAndSendMessage(userVote, type);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: createUser
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
