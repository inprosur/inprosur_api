import { getTursoClient } from "../config/db";
import { Advertising } from "../models/Advertising";

export const getAllAdvertisings = async () => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Advertisings");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as Advertising[];
};

export const createAdvertising = async (
  advertising: Advertising
): Promise<Advertising> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO Advertisings (imgUrl, externalUrl, status, courseId, createdAt) VALUES (?,?,?,?,?)",
    [
      advertising.imgUrl,
      advertising.externalUrl!,
      advertising.status ? 1 : 0,
      advertising.courseId,
      advertising.createdAt.toISOString(),
    ]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...advertising,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Advertising;
};
