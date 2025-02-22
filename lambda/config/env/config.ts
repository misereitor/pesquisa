import { config } from 'dotenv';
config();

export const environment = {
  ENV: 'dev',
  PGHOST: String(process.env.PGHOST),
  PGUSER: String(process.env.PGUSER),
  PGPASSWORD: String(process.env.PGPASSWORD),
  PGDATABASE: String(process.env.PGDATABASE),
  CDK_DEFAULT_ACCOUNT: String(process.env.CDK_DEFAULT_ACCOUNT),
  CDK_DEFAULT_REGION: String(process.env.CDK_DEFAULT_REGION),
  SECRET_USER_VOTE: String(process.env.SECRET_USER_VOTE),
  SECRET_USER_ADMIN: String(process.env.SECRET_USER_ADMIN),
  API_KEY_WHATSAPP: String(process.env.API_KEY_WHATSAPP),
  URL_API_WHATSAPP: String(process.env.URL_API_WHATSAPP)
};
