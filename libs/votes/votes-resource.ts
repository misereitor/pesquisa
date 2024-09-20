import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export function createVotesResources(
  api: apigateway.RestApi,
  lambdaCreateVoteInCache: LambdaIntegration,
  lambdaGetAllVotesInCache: LambdaIntegration,
  lambdaConfirmVotes: LambdaIntegration
) {
  const createVotesResource = api.root.addResource('create-vote');
  createVotesResource.addMethod('POST', lambdaCreateVoteInCache);

  const getAllVotesInCacheResource = api.root.addResource(
    'get-all-votes-in-cache'
  );
  getAllVotesInCacheResource.addMethod('GET', lambdaGetAllVotesInCache);

  const confirmVotesResource = api.root.addResource('confirm-votes');
  confirmVotesResource.addMethod('POST', lambdaConfirmVotes);
}
