import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { createUserVoteLambdas } from '../libs/user-vote-lambda';
import { createUserAdminLambdas } from '../libs/user-admin-lambda';
import { createIamRole } from '../libs/iam-roles';
import { createUserVoteResources } from '../libs/user-vote-resouce';
import { createUserAdminResources } from '../libs/user-admin-resource';

export class PesquisaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //ROLES
    const iamRole = createIamRole(this);

    //LAMBDAS
    const userVoteLambdas = createUserVoteLambdas(this, iamRole);

    const userAdminLambdas = createUserAdminLambdas(this, iamRole);

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
