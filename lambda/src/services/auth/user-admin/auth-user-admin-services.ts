import * as JWT from 'jsonwebtoken';
import * as bcript from 'bcrypt';
import { getUserAdminByUsername } from '../../queryDB/user-admin';
import { UserAdmin } from '../../../types/user-admin';

const SECRET_USER_ADMIN = process.env.SECRET_USER_ADMIN;

export async function loginUserAdminService(
  username: string,
  password: string
) {
  try {
    const user = await checksUser(username);
    await chackPassword(user, password);
    const token = createToken(user);
    user.password = '';
    const login = {
      ...user,
      token
    };
    return login;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function checksUser(username: string) {
  try {
    const userAdmin = await getUserAdminByUsername(username);
    if (!userAdmin) {
      throw new Error('Login ou senha inválidos');
    }
    return userAdmin;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function chackPassword(userAdmin: UserAdmin, password: string) {
  try {
    const isMatch = await bcript.compare(password, userAdmin.password);
    if (!isMatch) throw new Error('Login ou senha inválidos');
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function createToken(userAdmin: UserAdmin) {
  try {
    const token = JWT.sign(
      {
        id: userAdmin.id,
        username: userAdmin.username,
        roles: userAdmin.role
      },
      SECRET_USER_ADMIN as string,
      {
        expiresIn: '30d'
      }
    );
    return token;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
