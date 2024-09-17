export interface UserAdmin {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
  last_ip: string;
  date_create: Date;
}
