export const policies = [
  {
    Effect: 'Allow',
    Action: ['lambda:InvokeFunction'],
    Resource: 'arn:aws:lambda:us-east-2:851725500352:function:*'
  },
  {
    Effect: 'Allow',
    Resource: 'arn:aws:iam::851725500352:role/pesquisaRole',
    Action: 'sts:AssumeRole'
  },
  {
    Effect: 'Allow',
    Resource: 'arn:aws:iam::851725500352:role/pesquisaRole',
    Action: 'iam:PassRole'
  },
  {
    Effect: 'Allow',
    Resource: '*',
    Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents']
  },
  {
    Effect: 'Allow',
    Action: ['sns:Publish'],
    Resource: 'arn:aws:sns:us-east-1*'
  },
  {
    Effect: 'Allow',
    Resource: '*',
    Action: ['SNS:Publish']
  }
];
