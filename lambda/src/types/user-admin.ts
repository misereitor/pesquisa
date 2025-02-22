export interface UserAdmin {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  role: string;
  active: boolean;
  last_ip: string;
  date_create: Date;
}
