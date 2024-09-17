import { ConfirmedPhone } from '../../../types/login-user-vote';
import { UserVote } from '../../../types/user-vote';
import { buildUpdateQuery } from '../../../util/query-builder';
import { queryCuston } from '../../queryDB/custom-query';
import {
  createConfirmedLogin,
  deleteCodeConfirmed,
  getConfirmationUserVote
} from '../../queryDB/login_user_vote';
import {
  createUserVote,
  getUserVoteFromCPF,
  getUserVoteFromPhone,
  updateUserVotePhoneConfirmed
} from '../../queryDB/user-vote';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import * as JWT from 'jsonwebtoken';

const snsClient = new SNSClient();
const SECRET_USER_VOTE = process.env.SECRET_USER_VOTE;

export async function createUserAndSendSMS(user: UserVote) {
  try {
    const checksUser = await checksUserExistsAndDataIsTrue(user);
    if (checksUser) {
      const code = await createSMS(checksUser);
      const send = await sendSMS(code, user.phone);
      await Promise.all([code, send]);
      return checksUser;
    }
    const createUser = await createUserVote(user);
    const code = await createSMS(createUser);
    const send = await sendSMS(code, user.phone);
    await Promise.all([createUser, code, send]);
    return createUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function checksUserExistsAndDataIsTrue(user: UserVote) {
  try {
    const getFromCPF = await getUserVoteFromCPF(user.cpf);
    const getFromPhone = await getUserVoteFromPhone(user.phone);

    if (getFromCPF && getFromCPF.confirmed_vote) {
      throw new Error('CPF informado já confirmou voto');
    }
    if (getFromPhone && getFromPhone.confirmed_vote) {
      throw new Error('Telefone informado já confirmou voto');
    }

    if (
      getFromCPF &&
      getFromCPF.phone !== user.phone &&
      getFromCPF.confirmed_phone
    ) {
      throw new Error('CPF informado já está em uso');
    }
    if (
      getFromPhone &&
      getFromPhone.cpf !== user.cpf &&
      getFromPhone.confirmed_phone
    ) {
      throw new Error('Telefone informado já está em uso');
    }
    if (getFromCPF) {
      user.id = getFromCPF.id;
      return await updateUser(user);
    }
    if (getFromPhone) {
      user.id = getFromPhone.id;
      return await updateUser(user);
    }
    return false;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function createSMS(user: UserVote) {
  try {
    const date = new Date();
    const expiration_date = new Date(date.setHours(date.getHours() + 24));
    const code = Math.random().toString().substring(2, 8);
    const confirmedLogin: ConfirmedPhone = {
      id: 0,
      phone: user.phone,
      id_user: user.id,
      expiration_date,
      code
    };
    await createConfirmedLogin(confirmedLogin);
    return code;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function sendSMS(code: string, phone: string) {
  try {
    const codeEdit = `${code.substring(0, 3)}-${code.substring(3, 6)}`;
    const input = {
      PhoneNumber: '+55' + phone,
      Message: `Seu código de confirmação é para os melhores do ano é: ${codeEdit}`
    };
    const command = new PublishCommand(input);
    await snsClient.send(command);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function confirmSMS(code: string, phone: string) {
  try {
    const valide = await valideCode(code, phone);
    const gerateToken = createToken(phone);
    const deleteCode = await deleteCodeConfirmed(valide.id);
    const confirmUserCode = await updateUserVotePhoneConfirmed(phone);
    await Promise.all([valide, gerateToken, deleteCode, confirmUserCode]);
    return gerateToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function valideCode(code: string, phone: string) {
  const getConfirmed = await getConfirmationUserVote(phone, code);
  if (!getConfirmed) {
    throw new Error('Código incorreto');
  }
  const date = new Date();
  const dateExpiration = new Date(getConfirmed.expiration_date);
  if (dateExpiration < date) {
    throw new Error('Código expirado' + dateExpiration);
  }
  return getConfirmed;
}

function createToken(phone: string) {
  const token = JWT.sign({ phone }, SECRET_USER_VOTE as string, {
    expiresIn: '24h'
  });
  return token;
}

async function updateUser(user: UserVote) {
  const updateUser = buildUpdateQuery('users_vote', user);
  const update = await queryCuston(updateUser.text, updateUser.values);
  return update;
}
