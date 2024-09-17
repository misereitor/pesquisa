import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export function createUserVoteResources(
  api: apigateway.RestApi,
  loginUserVoteLambda: LambdaIntegration,
  confirmSmsUserVoteLambda: LambdaIntegration,
  valideTokenUserVoteLambda: LambdaIntegration
) {
  const loginResource = api.root.addResource('login-user-vote');
  loginResource.addMethod('POST', loginUserVoteLambda);

  const confirmSmsUserVoteResource = api.root.addResource(
    'confirm-sms-user-vote'
  );
  confirmSmsUserVoteResource.addMethod('POST', confirmSmsUserVoteLambda);

  const valideTokenUserVoteResource = api.root.addResource(
    'valide-token-user-vote'
  );
  valideTokenUserVoteResource.addMethod('POST', valideTokenUserVoteLambda);
}
