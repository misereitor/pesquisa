import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { createUserVoteLambdas } from '../libs/user-vote/user-vote-lambda';
import { createUserAdminLambdas } from '../libs/user-admin/user-admin-lambda';
import { createIamRole } from '../libs/roles/iam-roles';
import { createUserVoteResources } from '../libs/user-vote/user-vote-resouce';
import { createUserAdminResources } from '../libs/user-admin/user-admin-resource';
import { createManageLambdas } from '../libs/category-and-company/manage-lambda';
import { createManageResources } from '../libs/category-and-company/manage-resource';

export class PesquisaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //ROLES
    const iamRole = createIamRole(this);

    //LAMBDAS
    const userVoteLambdas = createUserVoteLambdas(this, iamRole);

    const userAdminLambdas = createUserAdminLambdas(this, iamRole);

    const manageLambdas = createManageLambdas(this, iamRole);

    //API
    const api = new apigateway.RestApi(this, 'PesquisaApi', {
      restApiName: 'Pesquisa API',
      description: 'API para pesquisa de votos'
    });

    const lambdaLoginUserVote = new apigateway.LambdaIntegration(
      userVoteLambdas.loginUserVoteLambda
    );

    const lambdaConfirmSMSUserVote = new apigateway.LambdaIntegration(
      userVoteLambdas.confirmSmsUserVoteLambda
    );

    const lambdaValideTokenUserVote = new apigateway.LambdaIntegration(
      userVoteLambdas.valideTokenUserVoteLambda
    );

    const lambdaCreateUserAdmin = new apigateway.LambdaIntegration(
      userAdminLambdas.createUserAdminLambda
    );

    const lambdaUpdateUserAdmin = new apigateway.LambdaIntegration(
      userAdminLambdas.updateUserAdminLambda
    );

    const lambdaUpdatePassword = new apigateway.LambdaIntegration(
      userAdminLambdas.updatePasswordUserAdminLambda
    );

    const lambdaLoginUserAdmin = new apigateway.LambdaIntegration(
      userAdminLambdas.loginUserAdminLambda
    );

    const lambdaUpdateRoleUserAdmin = new apigateway.LambdaIntegration(
      userAdminLambdas.updateRoleUserAdminLambda
    );

    const lambdaValideTokenUserAdmin = new apigateway.LambdaIntegration(
      userAdminLambdas.valideTokenUserAdminLambda
    );

    const lambdaCreateCompany = new apigateway.LambdaIntegration(
      manageLambdas.createCompanyLambda
    );
    const lambdaCreateCategory = new apigateway.LambdaIntegration(
      manageLambdas.createCategoryLambda
    );

    const lambdaCreateCompanies = new apigateway.LambdaIntegration(
      manageLambdas.createCompaniesLambda
    );
    const lambdaCategoriesAndCompanies = new apigateway.LambdaIntegration(
      manageLambdas.createCategoriesAndCompaniesLambda
    );
    const lambdaCreateAssociationCategory = new apigateway.LambdaIntegration(
      manageLambdas.createAssociationCategoryLambda
    );
    const lambdaCreateAssociationCategories = new apigateway.LambdaIntegration(
      manageLambdas.createAssociationCategoriesLambda
    );
    const lambdaUpdateCompany = new apigateway.LambdaIntegration(
      manageLambdas.updateCompanyLambda
    );
    const lambdaUpdateCategory = new apigateway.LambdaIntegration(
      manageLambdas.updateCategoryLambda
    );
    const lambdaGetAllCompany = new apigateway.LambdaIntegration(
      manageLambdas.getAllCompanyLambda
    );
    const lambdaGetAllCategory = new apigateway.LambdaIntegration(
      manageLambdas.getAllCategoryLambda
    );
    const lambdaGetAllAssociation = new apigateway.LambdaIntegration(
      manageLambdas.getAllAssociationLambda
    );
    const lambdaGetCompanyById = new apigateway.LambdaIntegration(
      manageLambdas.getCompanyByIdLambda
    );
    const lambdaGetCategoryById = new apigateway.LambdaIntegration(
      manageLambdas.getCategoryByIdLambda
    );
    const lambdaGetAssociationByCategoryId = new apigateway.LambdaIntegration(
      manageLambdas.getAssociationByCategoryIdLambda
    );
    const lambdaDeleteCompany = new apigateway.LambdaIntegration(
      manageLambdas.deleteCompanyLambda
    );
    const lambdaDeleteCategory = new apigateway.LambdaIntegration(
      manageLambdas.deleteCategoryLambda
    );
    const lambdaDeleteAssociation = new apigateway.LambdaIntegration(
      manageLambdas.deleteAssociationLambda
    );

    //RESOURCE
    createUserVoteResources(
      api,
      lambdaLoginUserVote,
      lambdaConfirmSMSUserVote,
      lambdaValideTokenUserVote
    );
    createUserAdminResources(
      api,
      lambdaCreateUserAdmin,
      lambdaUpdateUserAdmin,
      lambdaUpdatePassword,
      lambdaLoginUserAdmin,
      lambdaUpdateRoleUserAdmin,
      lambdaValideTokenUserAdmin
    );

    createManageResources(
      api,
      lambdaCreateCompany,
      lambdaCreateCategory,
      lambdaCreateCompanies,
      lambdaCategoriesAndCompanies,
      lambdaCreateAssociationCategory,
      lambdaCreateAssociationCategories,
      lambdaUpdateCompany,
      lambdaUpdateCategory,
      lambdaGetAllCompany,
      lambdaGetAllCategory,
      lambdaGetAllAssociation,
      lambdaGetCompanyById,
      lambdaGetCategoryById,
      lambdaGetAssociationByCategoryId,
      lambdaDeleteCompany,
      lambdaDeleteCategory,
      lambdaDeleteAssociation
    );

    //SNS
    const topic = new Topic(this, 'TopicPesquisa', {
      displayName: 'Pesquisa'
    });
    topic.grantPublish(userVoteLambdas.loginUserVoteLambda);
    topic.addSubscription(
      new LambdaSubscription(userVoteLambdas.loginUserVoteLambda)
    );
  }
}
