import * as JWT from 'jsonwebtoken';

const SECRET_USER_ADMIN = process.env.SECRET_USER_ADMIN;

export function valideTokenUserAdminService(token: string) {
  try {
    const decoded = JWT.verify(token, SECRET_USER_ADMIN as string);
    return decoded;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
