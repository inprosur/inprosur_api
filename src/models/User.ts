export interface User {
  id?: number;
  username: string;
  email: string;
  //password: string;
  createdAt: Date;
  uId: string;
  photo?: string;
  status: boolean;
}
