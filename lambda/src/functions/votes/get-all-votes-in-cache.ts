import { valideTokenUserVoteService } from '../../services/auth/user-vote/valide-token-user-vote-service';
import { getAllVotesService } from '../../services/votes/votes-sevices';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserVoteService(token);
    if (!valideToken) throw new Error('invalid token');
    const { id_user_vote } = event.queryStringParameters;
    const votes = await getAllVotesService(id_user_vote);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success',
        data: votes
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
