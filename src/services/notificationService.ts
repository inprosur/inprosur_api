import db from "../config/db";
import { Notification } from "../models/Notification";

export const createNotification = async (
  notification: Notification
): Promise<Notification> => {
  const result = await db.execute(
    `
        INSERT INTO Notifications (destination, studentId, instructorId, status, date)`,
    [
      notification.destination,
      notification.studentId !== undefined ? notification.studentId : null,
      notification.instructorId !== undefined
        ? notification.instructorId
        : null,
      notification.status !== undefined ? notification.status : null,
      notification.date.toISOString(),
    ]
  );
  const id = result.lastInsertRowid;
  const row = {
    ...notification,
    id: id !== undefined ? Number.parseInt(id.toString()) : undefined,
  };
  return row as Notification;
};
