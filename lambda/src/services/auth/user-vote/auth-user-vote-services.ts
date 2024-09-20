import { ConfirmedPhone } from '../../../types/login-user-vote';
import { UserVote } from '../../../types/user-vote';
import { buildUpdateQuery } from '../../../util/query-builder';
import { queryCuston } from '../../queryDB/custom-query';
import {
  createConfirmedLogin,
  deleteCodeConfirmed,
  getConfirmationUserVote
} from '../../queryDB/login-user-vote';
import {
  createUserVote,
  getUserVoteFromCPF,
  getUserVoteFromPhone,
  updateUserVotePhoneConfirmed
} from '../../queryDB/user-vote';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import * as JWT from 'jsonwebtoken';

const snsClient = new SNSClient();
const { SECRET_USER_VOTE, URL_API_WHATSAPP } = process.env;

export async function createUserAndSendMessage(user: UserVote, type: string) {
  try {
    let userVote: UserVote;
    const checksUser = await checksUserExistsAndDataIsTrue(user);
    if (checksUser) {
      userVote = checksUser;
    } else {
      const createUser = await createUserVote(user);
      userVote = createUser;
    }
    const code = await createCode(userVote);
    await sendMessage(code, user.phone, type);
    return userVote;
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

async function createCode(user: UserVote) {
  try {
    const date = new Date();
    const expiration_date = new Date(date.setHours(date.getHours() + 24));
    const code = Math.random().toString().substring(2, 8);
    const confirmedLogin: ConfirmedPhone = {
      id: 0,
      phone: user.phone,
      id_user_vote: user.id,
      expiration_date,
      code
    };
    await createConfirmedLogin(confirmedLogin);
    return code;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function sendMessage(code: string, phone: string, type: string) {
  const codeEdit = `${code.substring(0, 3)}-${code.substring(3, 6)}`;
  const message = `Seu código de confirmação é para os melhores do ano é: ${codeEdit}`;
  try {
    const checkNumberIsWhatsapp = await fetch(
      `${URL_API_WHATSAPP}/api/contacts/check-exists?phone=${phone}&session=default`
    );
    if (checkNumberIsWhatsapp.ok) {
      if (type === 'whatsapp') {
        const data = await checkNumberIsWhatsapp.json();
        if (data.numberExists) {
          await sendMessageWhatsapp(data.chatId, message);
          return;
        } else {
          await sendMessageSMS(phone, message);
        }
      }
    }
    if (type === 'sms') {
      await sendMessageSMS(phone, message);
      return;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function sendMessageSMS(phone: string, message: string) {
  const input = {
    PhoneNumber: '+55' + phone,
    Message: message
  };
  const command = new PublishCommand(input);
  await snsClient.send(command);
}

async function sendMessageWhatsapp(phone: string, message: string) {
  const input = {
    chatId: phone,
    text: message,
    session: 'default'
  };
  await fetch(`${URL_API_WHATSAPP}/api/sendText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(input)
  });
}

export async function confirmCode(code: string, phone: string) {
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
  const { rows } = await queryCuston(updateUser.text, updateUser.values);
  return rows[0] as unknown as UserVote;
}
