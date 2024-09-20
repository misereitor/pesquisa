import { UserVote } from '../../types/user-vote';
import { Vote, VotesConfirmed } from '../../types/votes';
import { updateUserVoteAfterVoteConfirm } from '../queryDB/user-vote';
import {
  confirmVote,
  createVoteInCache,
  deleteVoteInCache,
  getAllVotesConfirmedFromUser,
  getAllVotesInCache,
  getVoteInCacheById,
  updateVoteInCache
} from '../queryDB/votes';

export async function createVoteInCacheService(vote: Vote) {
  try {
    const voteExist = await getVoteInCacheById(vote);
    if (voteExist) {
      await updateVoteInCache(vote);
      console.log(voteExist);
    } else {
      await createVoteInCache(vote);
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getAllVotesService(id_user_vote: number) {
  try {
    const votes = await getAllVotesInCache(id_user_vote);
    return votes;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function confirmVoteService(userVote: UserVote) {
  try {
    await confirmVote(userVote.id);
    await deleteVoteInCache(userVote.id);
    await updateVotesUserVoteConfirmation(userVote);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

async function updateVotesUserVoteConfirmation(userVote: UserVote) {
  try {
    const votes: VotesConfirmed[] = await getAllVotesConfirmedFromUser(
      userVote.id
    );

    await updateUserVoteAfterVoteConfirm(userVote, votes);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
