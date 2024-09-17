import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';

export function createUserAdminResources(
  api: apigateway.RestApi,
  lambdaCreateUserAdmin: LambdaIntegration,
  lambdaUpdateUserAdmin: LambdaIntegration,
  lambdaUpdatePassword: LambdaIntegration,
  lambdaLoginUserAdmin: LambdaIntegration,
  lambdaUpdateRoleUserAdmin: LambdaIntegration,
  lambdaValideTokenUserAdmin: LambdaIntegration
) {
  const createUserAdminResource = api.root.addResource('create-user-admin');
  createUserAdminResource.addMethod('POST', lambdaCreateUserAdmin);

  const updateUserAdminResource = api.root.addResource('update-user-admin');
  updateUserAdminResource.addMethod('POST', lambdaUpdateUserAdmin);

  const updatePasswordUserAdminResource = api.root.addResource(
    'update-password-user-admin'
  );
  updatePasswordUserAdminResource.addMethod('POST', lambdaUpdatePassword);

  const loginUserAdminResource = api.root.addResource('login-user-admin');
  loginUserAdminResource.addMethod('POST', lambdaLoginUserAdmin);

  const updateRoleUserAdminResource = api.root.addResource(
    'update-role-user-admin'
  );
  updateRoleUserAdminResource.addMethod('POST', lambdaUpdateRoleUserAdmin);

  const ValideTokenUserAdminResource = api.root.addResource(
    'valide-token-user-admin'
  );
  ValideTokenUserAdminResource.addMethod('POST', lambdaValideTokenUserAdmin);
}
