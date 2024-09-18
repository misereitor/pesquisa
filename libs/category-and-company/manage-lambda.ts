import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { environment } from '../../lambda/config/env/config';
import * as iam from 'aws-cdk-lib/aws-iam';

const defaultLambdaOptions = {
  runtime: lambda.Runtime.NODEJS_18_X,
  memorySize: 128,
  timeout: cdk.Duration.seconds(10),
  retryAttempts: 0
};

export function createManageLambdas(scope: cdk.Stack, iamRole: iam.Role) {
  const createCompanyLambda = new lambda.Function(
    scope,
    'CreateCompanyLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/create-company.handler',
      role: iamRole
    }
  );

  const createCategoryLambda = new lambda.Function(
    scope,
    'CreateCategoryLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/create-category.handler',
      role: iamRole
    }
  );

  const createCompaniesLambda = new lambda.Function(
    scope,
    'CreateCompaniesLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/create-companies.handler',
      role: iamRole
    }
  );

  const createCategoriesAndCompaniesLambda = new lambda.Function(
    scope,
    'CreateCategoriesAndCompaniesLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/create-categories-with-companies.handler',
      role: iamRole
    }
  );

  const createAssociationCategoryLambda = new lambda.Function(
    scope,
    'CreateAssociationCategoryLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/create-association-category.handler',
      role: iamRole
    }
  );

  const createAssociationCategoriesLambda = new lambda.Function(
    scope,
    'CreateAssociationCategoriesLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/create-association-categories.handler',
      role: iamRole
    }
  );

  const updateCompanyLambda = new lambda.Function(
    scope,
    'UpdateCompanyLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/update-company.handler',
      role: iamRole
    }
  );

  const updateCategoryLambda = new lambda.Function(
    scope,
    'UpdateCategoryLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/update-category.handler',
      role: iamRole
    }
  );

  const getAllCompanyLambda = new lambda.Function(
    scope,
    'GetAllCompanyLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/get-all-company.handler',
      role: iamRole
    }
  );

  const getAllCategoryLambda = new lambda.Function(
    scope,
    'GetAllCategoryLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/get-all-category.handler',
      role: iamRole
    }
  );

  const getAllAssociationLambda = new lambda.Function(
    scope,
    'GetAllAssociationLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/get-all-association.handler',
      role: iamRole
    }
  );

  const getCompanyByIdLambda = new lambda.Function(
    scope,
    'GetCompanyByIdLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/get-company-by-id.handler',
      role: iamRole
    }
  );

  const getCategoryByIdLambda = new lambda.Function(
    scope,
    'GetCategoryByIdLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/get-category-by-id.handler',
      role: iamRole
    }
  );

  const getAssociationByCategoryIdLambda = new lambda.Function(
    scope,
    'GetAssociationByCategoryIdLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/get-association-by-category-id.handler',
      role: iamRole
    }
  );

  const deleteCompanyLambda = new lambda.Function(
    scope,
    'DeleteCompanyLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/delete-company.handler',
      role: iamRole
    }
  );

  const deleteCategoryLambda = new lambda.Function(
    scope,
    'DeleteCategoryLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/delete-category.handler',
      role: iamRole
    }
  );

  const deleteAssociationLambda = new lambda.Function(
    scope,
    'DeleteAssociationLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/manage/delete-association.handler',
      role: iamRole
    }
  );

  return {
    createCompanyLambda,
    createCategoryLambda,
    createCompaniesLambda,
    createCategoriesAndCompaniesLambda,
    createAssociationCategoryLambda,
    createAssociationCategoriesLambda,
    updateCompanyLambda,
    updateCategoryLambda,
    getAllCompanyLambda,
    getAllCategoryLambda,
    getAllAssociationLambda,
    getCompanyByIdLambda,
    getCategoryByIdLambda,
    getAssociationByCategoryIdLambda,
    deleteCompanyLambda,
    deleteCategoryLambda,
    deleteAssociationLambda
  };
}
