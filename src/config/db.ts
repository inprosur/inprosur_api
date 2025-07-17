import { createClient } from "@libsql/client";
import dotenv from "dotenv";

dotenv.config();

let turso: ReturnType<typeof createClient> | null = null;

export const getTursoClient = () => {
  if (!turso) {
    turso = createClient({
      url: process.env.TURSO_URL!,
      authToken: process.env.TURSO_AUTH_TOKEN!,
    });
  }
  return turso;
};
