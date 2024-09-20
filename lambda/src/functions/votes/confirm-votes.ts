import { valideTokenUserVoteService } from '../../services/auth/user-vote/valide-token-user-vote-service';
import { confirmVoteService } from '../../services/votes/votes-sevices';
import { UserVote } from '../../types/user-vote';

exports.handler = async (event: any) => {
  try {
    const token = event.headers.Authorization;
    const valideToken = valideTokenUserVoteService(token);
    if (!valideToken) throw new Error('invalid token');
    const user: UserVote = JSON.parse(event.body);
    await confirmVoteService(user);
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
