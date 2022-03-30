export interface User {
  id?: string;
  schoolName: string;
  email: string;
  password: string;
  active: boolean;
  createdAt?: Date;
}
