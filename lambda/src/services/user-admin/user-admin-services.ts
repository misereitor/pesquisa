import { UserAdmin } from '../../types/user-admin';
import * as bcrypt from 'bcrypt';
import {
  createUserAdmin,
  getUserAdminById,
  getUserAdminByUsername,
  updatePasswordUserAdmin,
  updateRoleUserAdmin,
  updateUserAdmin
} from '../queryDB/user-admin';

export async function createUserAdminServices(user: UserAdmin) {
  try {
    const userExist = await getUserAdminByUsername(user.username);
    if (userExist) throw new Error('Usuário já está em uso');
    user.password = await encryptPassword(user.password);
    const createUser = await createUserAdmin(user);
    createUser.password = '';
    return createUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateUserAdminServices(user: UserAdmin) {
  try {
    const userExist = await getUserAdminById(user.id);
    if (!userExist) throw new Error('Usuário não encontrado');
    const usernameExist = await getUserAdminByUsername(user.username);
    if (usernameExist.id !== user.id) throw new Error('Usuário já está em uso');
    const updateUser = await updateUserAdmin(user);
    updateUser.password = '';
    return updateUser;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updatePasswordUserAdminServices(user: UserAdmin) {
  try {
    const userExist = await getUserAdminById(user.id);
    if (!userExist) throw new Error('Usuário não encontrado');
    user.password = await encryptPassword(user.password);
    await updatePasswordUserAdmin(user);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function updateRoleUserAdminService(user: UserAdmin) {
  try {
    const userExist = await getUserAdminById(user.id);
    if (!userExist) throw new Error('Usuário não encontrado');
    const userUpdate = await updateRoleUserAdmin(user);
    userUpdate.password = '';
    return userUpdate;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

async function encryptPassword(password: string) {
  const hashPassword = await bcrypt.hash(password, 10);
  return hashPassword;
}
