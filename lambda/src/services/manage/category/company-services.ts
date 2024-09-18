import { Company } from '../../../types/company';
import {
  createCompany,
  disableCompany,
  enableCompany,
  getAllCompany,
  getCompanyByCNPJ,
  getCompanyById,
  updateCompany
} from '../../queryDB/company';

export async function createCompanyService(company: Company) {
  try {
    company.cnpj = company.cnpj.replace(/\D/g, '');
    const companyExist = await getCompanyByCNPJ(company.cnpj);
    if (!companyExist) {
      return await createCompany(company);
    }
    if (!companyExist.active) {
      await enableCompany(companyExist.id);
      return await updateCompany(company);
    }
    company.id = companyExist.id;

    return await updateCompany(company);
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getAllCompanyService() {
  try {
    const companies = await getAllCompany();
    return companies;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function getCompanyByIdService(id: number) {
  try {
    const Company = await getCompanyById(id);
    return Company;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function updateCompanyService(company: Company) {
  try {
    company.cnpj = company.cnpj.replace(/\D/g, '');
    const update = await updateCompany(company);
    return update;
  } catch (e: any) {
    throw new Error(e.message);
  }
}

export async function disableCompanyService(id: number) {
  try {
    await disableCompany(id);
  } catch (e: any) {
    throw new Error(e.message);
  }
}
