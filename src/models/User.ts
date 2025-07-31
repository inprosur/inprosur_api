import { Student } from "./Student";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  uId: string;
  photo?: string;
  status: boolean;
}

export interface UserStudent extends Omit<User, "password"> {
  student: Student;
}
