import { getTursoClient } from "../config/db";
import { Commission } from "../models/Comission";

export const createCommission = async (
  commission: Commission
): Promise<Commission> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO Commissions (instructorId, percentage) VALUES (?, ?)",
    [commission.instructorId, commission.percentage]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...commission,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Commission;
};

export const getCommissionById = async (
  id: number
): Promise<Commission | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM Commissions WHERE id=?", [
    id,
  ]);
  const row = Array.isArray(result) ? result[0] : result.rows;
  if (row.length === 1) {
    return row[0] as Commission;
  } else {
    return null;
  }
};
