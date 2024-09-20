import { valideTokenUserVoteService } from '../../services/auth/user-vote/valide-token-user-vote-service';
import { createVoteInCacheService } from '../../services/votes/votes-sevices';
import { Vote } from '../../types/votes';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserVoteService(token);
    if (!valideToken) throw new Error('invalid token');
    const vote: Vote = JSON.parse(event.body);
    await createVoteInCacheService(vote);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'success'
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
