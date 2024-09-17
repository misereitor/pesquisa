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

export function createUserAdminLambdas(scope: cdk.Stack, iamRole: iam.Role) {
  const createUserAdminLambda = new lambda.Function(
    scope,
    'CreateUserAdminLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/user-admin/create-user-admin.handler',
      role: iamRole
    }
  );

  const updateUserAdminLambda = new lambda.Function(
    scope,
    'UpdateUserAdminLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/user-admin/update-user-admin.handler',
      role: iamRole
    }
  );

  const updatePasswordUserAdminLambda = new lambda.Function(
    scope,
    'UpdatePasswordUserAdminLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/user-admin/update-password-user-admin.handler',
      role: iamRole
    }
  );

  const loginUserAdminLambda = new lambda.Function(
    scope,
    'LoginUserAdminLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/auth/user-admin/login-user-admin.handler',
      role: iamRole
    }
  );

  const updateRoleUserAdminLambda = new lambda.Function(
    scope,
    'UpdateRoleUserAdminLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/user-admin/update-role-user-admin.handler',
      role: iamRole
    }
  );

  const valideTokenUserAdminLambda = new lambda.Function(
    scope,
    'ValideTokenUserAdminLambda',
    {
      ...defaultLambdaOptions,
      code: lambda.Code.fromAsset('lambda'),
      environment: environment,
      handler: 'src/functions/auth/user-admin/valide-token-user-admin.handler',
      role: iamRole
    }
  );

  return {
    createUserAdminLambda,
    updateUserAdminLambda,
    updatePasswordUserAdminLambda,
    loginUserAdminLambda,
    updateRoleUserAdminLambda,
    valideTokenUserAdminLambda
  };
}
