import { getTursoClient } from "../config/db";
import { AccessLog } from "../models/AccessLog";

export const getAllAccessLogs = async (): Promise<AccessLog[]> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM AccessLog");
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows as AccessLog[];
};

export const getAccessLogById = async (
  id: number
): Promise<AccessLog | null> => {
  const client = getTursoClient();
  const result = await client.execute("SELECT * FROM AccessLog WHERE id = ?", [
    id,
  ]);
  const rows = Array.isArray(result) ? result[0] : result.rows;
  return rows.length === 1 ? (rows[0] as AccessLog) : null;
};

export const createAccessLog = async (
  accessLog: AccessLog
): Promise<AccessLog> => {
  const client = getTursoClient();
  const result = await client.execute(
    "INSERT INTO AccessLog (accessType, accessTime, studentId, courseId, videoId, documentId) VALUES (?, ?, ?, ?, ?, ?)",
    [
      accessLog.accessType,
      accessLog.accessTime.toISOString(),
      accessLog.studentId,
      accessLog.courseId || null,
      accessLog.videoId || null,
      accessLog.documentId || null,
    ]
  );

  const id = result.lastInsertRowid;
  return {
    ...accessLog,
    id: id !== undefined ? Number(id.toString()) : undefined,
  } as AccessLog;
};
