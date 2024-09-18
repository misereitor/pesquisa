import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export function createManageResources(
  api: apigateway.RestApi,
  lambdaCreateCompany: LambdaIntegration,
  lambdaCreateCategory: LambdaIntegration,
  lambdaCreateCompanies: LambdaIntegration,
  lambdaCategoriesAndCompanies: LambdaIntegration,
  lambdaCreateAssociationCategory: LambdaIntegration,
  lambdaCreateAssociationCategories: LambdaIntegration,
  lambdaUpdateCompany: LambdaIntegration,
  lambdaUpdateCategory: LambdaIntegration,
  lambdaGetAllCompany: LambdaIntegration,
  lambdaGetAllCategory: LambdaIntegration,
  lambdaGetAllAssociation: LambdaIntegration,
  lambdaGetCompanyById: LambdaIntegration,
  lambdaGetCategoryById: LambdaIntegration,
  lambdaGetAssociationByCategoryId: LambdaIntegration,
  lambdaDeleteCompany: LambdaIntegration,
  lambdaDeleteCategory: LambdaIntegration,
  lambdaDeleteAssociation: LambdaIntegration
) {
  const createCompanyResource = api.root.addResource('create-company');
  createCompanyResource.addMethod('POST', lambdaCreateCompany);

  const createCategoryResource = api.root.addResource('create-category');
  createCategoryResource.addMethod('POST', lambdaCreateCategory);

  const createCompaniesResource = api.root.addResource('create-companies');
  createCompaniesResource.addMethod('POST', lambdaCreateCompanies);

  const createCategoriesAndCompaniesResource = api.root.addResource(
    'create-categories-with-companies'
  );
  createCategoriesAndCompaniesResource.addMethod(
    'POST',
    lambdaCategoriesAndCompanies
  );

  const createAssociationCategoryResource = api.root.addResource(
    'create-association-category'
  );
  createAssociationCategoryResource.addMethod(
    'POST',
    lambdaCreateAssociationCategory
  );

  const createAssociationCategoriesResource = api.root.addResource(
    'create-association-categories'
  );
  createAssociationCategoriesResource.addMethod(
    'POST',
    lambdaCreateAssociationCategories
  );

  const updateCompanyResource = api.root.addResource('update-company');
  updateCompanyResource.addMethod('PUT', lambdaUpdateCompany);

  const updateCategoryResource = api.root.addResource('update-category');
  updateCategoryResource.addMethod('PUT', lambdaUpdateCategory);

  const getAllCompanyResource = api.root.addResource('get-all-company');
  getAllCompanyResource.addMethod('GET', lambdaGetAllCompany);

  const getAllCategoryResource = api.root.addResource('get-all-category');
  getAllCategoryResource.addMethod('GET', lambdaGetAllCategory);

  const getAllAssociationResource = api.root.addResource('get-all-association');
  getAllAssociationResource.addMethod('GET', lambdaGetAllAssociation);

  const getCompanyByIdResource = api.root.addResource('get-company-by-id');
  getCompanyByIdResource.addMethod('GET', lambdaGetCompanyById);

  const getCategoryByIdResource = api.root.addResource('get-category-by-id');
  getCategoryByIdResource.addMethod('GET', lambdaGetCategoryById);

  const getAssociationByCategoryIdResource = api.root.addResource(
    'get-association-by-category-id'
  );
  getAssociationByCategoryIdResource.addMethod(
    'GET',
    lambdaGetAssociationByCategoryId
  );

  const deleteCompanyResource = api.root.addResource('delete-company');
  deleteCompanyResource.addMethod('DELETE', lambdaDeleteCompany);

  const deleteCategoryResource = api.root.addResource('delete-category');
  deleteCategoryResource.addMethod('DELETE', lambdaDeleteCategory);

  const deleteAssociationResource = api.root.addResource('delete-association');
  deleteAssociationResource.addMethod('DELETE', lambdaDeleteAssociation);
}
