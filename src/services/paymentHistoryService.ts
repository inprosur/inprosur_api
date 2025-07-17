import { getTursoClient } from "../config/db";
import { PaymentHistory } from "../models/PaymentHistory";

export const getAllPaymentHistories = async (): Promise<PaymentHistory[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM PaymentHistory");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as PaymentHistory[];
};

export const getPaymentHistoryById = async (
  id: number
): Promise<PaymentHistory | null> => {
  const client = getTursoClient();
  const result = await client.execute(
    "SELECT * FROM PaymentHistory WHERE id = ?",
    [id]
  );
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length === 1 ? (rows[0] as PaymentHistory) : null;
};

export const createPaymentHistory = async (
  payment: Omit<PaymentHistory, "id" | "paymentDate">
): Promise<PaymentHistory> => {
  const client = getTursoClient();
  const result = await client.execute(
    `INSERT INTO PaymentHistory (
            studentId, 
            courseId, 
            videoId, 
            documentId, 
            amount, 
            paymentDate
        ) VALUES (?, ?, ?, ?, ?, ?)`,
    [
      payment.studentId,
      payment.courseId || null,
      payment.videoId || null,
      payment.documentId || null,
      payment.amount,
      new Date().toISOString(), // paymentDate automático
    ]
  );
  const id = result.lastInsertRowid;
  return {
    id: id !== undefined ? Number(id) : 0,
    ...payment,
    paymentDate: new Date(),
  };
};
