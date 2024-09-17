import * as iam from 'aws-cdk-lib/aws-iam';
import { policies } from '../policies/policies';
import { Construct } from 'constructs';

export function createIamRole(scope: Construct): iam.Role {
  const iamRole = new iam.Role(scope, 'PesquisaRole', {
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
    iamRole.addToPolicy(policyStatement);
  });

  return iamRole;
}
