import { VotesConfirmed } from './votes';

export interface UserVote {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  uf: string;
  city: string;
  confirmed_vote: boolean;
  confirmed_phone: boolean;
  date_create: Date;
  date_vote: Date;
  percentage_vote?: number;
  last_ip: string;
  votes: VotesConfirmed[];
}
