import * as JWT from 'jsonwebtoken';

const SECRET_USER_VOTE = process.env.SECRET_USER_VOTE;

export function valideTokenUserVoteService(token: string) {
  try {
    if (!token) throw new Error('Token invalid');
    const date = new Date();
    const bearer = token.split(' ')[1];
    const decoded = JWT.verify(bearer, SECRET_USER_VOTE as string);
    if (decoded === null) throw new Error('Token invalid');
    if (typeof decoded === 'string') throw new Error('Token invalid');
    if (date.getTime() > Number(decoded.exp) * 1000)
      return new Error('Token expired');
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
