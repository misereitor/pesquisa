import { Company } from '../../../types/company';
import { createCompaniesBuildQuery } from '../../../util/query-builder';
import {
  createCompany,
  disableCompany,
  enableCompany,
  getAllCompany,
  getCompanyByCNPJ,
  getCompanyById,
  updateCompany
} from '../../queryDB/company';
import { queryCuston } from '../../queryDB/custom-query';

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

export async function createCompaniesService(company: Company[]) {
  const createCompanies: Company[] = [];
  const allCompanies = [];
  const companies = await getAllCompany();
  console.log('allCompanies');
  try {
    for (let i = 0; i < company.length; i++) {
      company[i].cnpj = company[i].cnpj.replace(/\D/g, '');

      const companyExistCnpj = companies.find(
        (comp) => comp.cnpj === company[i].cnpj
      );
      if (companyExistCnpj) allCompanies.push(companyExistCnpj);
      if (!companyExistCnpj) {
        createCompanies.push(company[i]);
      } else if (!companyExistCnpj?.active) {
        await enableCompany(companyExistCnpj.id);
        company[i].id = companyExistCnpj.id;
        await updateCompany(company[i]);
      }
    }
    if (createCompanies.length === 0) return allCompanies;
    const query = createCompaniesBuildQuery(createCompanies);
    const { rows } = await queryCuston(query.text, []);
    allCompanies.push(...rows);
    return allCompanies;
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
