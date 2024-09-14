import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { policies } from '../policies/policies';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { environment } from '../lambda/config/env/config';
import { LambdaSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';

export class PesquisaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //ROLES
    const iamROle = new iam.Role(this, 'pesquisaRole', {
      assumedBy: new iam.CompositePrincipal(
        new iam.ServicePrincipal('lambda.amazonaws.com'),
        new iam.ServicePrincipal('scheduler.amazonaws.com'),
        new iam.ServicePrincipal('events.amazonaws.com'),
        new iam.ServicePrincipal('cloudformation.amazonaws.com')
      ),
      roleName: 'pesquisaRole'
    });

    policies.forEach((policy) => {
      const policyStatement = new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: Array.isArray(policy.Action) ? policy.Action : [policy.Action],
        resources: Array.isArray(policy.Resource)
          ? policy.Resource
          : [policy.Resource]
      });
      iamROle.addToPolicy(policyStatement);
    });

    //LAMBDAS
    const loginUserVoteLambda = new lambda.Function(
      this,
      'loginUserVoteLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        environment: environment,
        handler: 'src/auth/user-vote/login-user-vote.handler',
        role: iamROle,
        timeout: cdk.Duration.seconds(10),
        memorySize: 128,
        retryAttempts: 0
      }
    );

    const confirmSmsUserVoteLambda = new lambda.Function(
      this,
      'ConfirmSmsserVoteLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('lambda'),
        environment: environment,
        handler: 'src/auth/user-vote/confirm-sms.handler',
        role: iamROle,
        timeout: cdk.Duration.seconds(10),
        memorySize: 128,
        retryAttempts: 0
      }
    );

    //SNS
    const topic = new Topic(this, 'TopicPesquisa', {
      displayName: 'Pesquisa'
    });
    topic.grantPublish(loginUserVoteLambda);
    topic.addSubscription(new LambdaSubscription(loginUserVoteLambda));

    //URL
    loginUserVoteLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });

    confirmSmsUserVoteLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });
  }
}
