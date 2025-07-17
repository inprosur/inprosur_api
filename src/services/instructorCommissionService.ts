import { getTursoClient } from "../config/db";
import { InstructorCommission } from "../models/InstructorCommission";

export const getAllCommissions = async (): Promise<InstructorCommission[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM InstructorCommissions");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as InstructorCommission[];
};

export const getCommissionById = async (
  id: number
): Promise<InstructorCommission | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM InstructorCommissions WHERE id = ?",
    [id]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length === 1 ? (rows[0] as InstructorCommission) : null;
};

export const createCommission = async (
  commission: Omit<InstructorCommission, "id" | "paymentDate">
): Promise<InstructorCommission> => {
  const client = getTursoClient();
  const result = await client.execute(
    `INSERT INTO InstructorCommissions (
            instructorId, 
            courseId, 
            videoId, 
            documentId, 
            commissionPercentage, 
            commissionAmount, 
            paymentDate
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      commission.instructorId,
      commission.courseId || null,
      commission.videoId || null,
      commission.documentId || null,
      commission.commissionPercentage,
      commission.commissionAmount,
      new Date().toISOString(), // paymentDate automático
    ]
  );
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...commission,
    paymentDate: new Date(),
  };
};
