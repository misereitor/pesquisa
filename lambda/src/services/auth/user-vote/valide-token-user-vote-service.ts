import * as JWT from 'jsonwebtoken';

const SECRET_USER_VOTE = process.env.SECRET_USER_VOTE;

export function valideTokenUserVoteService(token: string) {
  try {
    const decoded = JWT.verify(token, SECRET_USER_VOTE as string);
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
