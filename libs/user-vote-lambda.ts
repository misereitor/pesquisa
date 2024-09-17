import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { environment } from '../lambda/config/env/config';
import * as iam from 'aws-cdk-lib/aws-iam';

const defaultLambdaOptions = {
  runtime: lambda.Runtime.NODEJS_18_X,
  memorySize: 128,
  timeout: cdk.Duration.seconds(10),
  retryAttempts: 0
};

export function createUserVoteLambdas(scope: cdk.Stack, iamRole: iam.Role) {
  const loginUserVoteLambda = new lambda.Function(
    scope,
    'LoginUserVoteLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/auth/user-vote/login-user-vote.handler',
      role: iamRole
    }
  );

  const confirmSmsUserVoteLambda = new lambda.Function(
    scope,
    'ConfirmSmsUserVoteLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/auth/user-vote/confirm-sms-user-vote.handler',
      role: iamRole
    }
  );

  const valideTokenUserVoteLambda = new lambda.Function(
    scope,
    'ValideTokenUserVoteLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/auth/user-vote/valide-token-user-vote.handler',
      role: iamRole
    }
  );

  return {
    loginUserVoteLambda,
    confirmSmsUserVoteLambda,
    valideTokenUserVoteLambda
  };
}
