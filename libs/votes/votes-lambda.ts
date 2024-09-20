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

export function createVotesLambdas(scope: cdk.Stack, iamRole: iam.Role) {
  const createVotesInCacheLambda = new lambda.Function(
    scope,
    'CreateVotesInCacheLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/votes/create-vote-in-cache.handler',
      role: iamRole
    }
  );

  const getAllVotesInCacheLambda = new lambda.Function(
    scope,
    'GetAllVotesInCacheForUserLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/votes/get-all-votes-in-cache.handler',
      role: iamRole
    }
  );

  const confirmVotesLambda = new lambda.Function(scope, 'ConfirmVotesLambda', {
    ...defaultLambdaOptions,
    code: lambda.Code.fromAsset('lambda'),
    environment: environment,
    handler: 'src/functions/votes/confirm-votes.handler',
    role: iamRole
  });

  return {
    createVotesInCacheLambda,
    getAllVotesInCacheLambda,
    confirmVotesLambda
  };
}
