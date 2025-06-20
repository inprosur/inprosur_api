import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

export const hashedPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
