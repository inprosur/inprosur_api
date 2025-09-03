import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import permissionRoutes from "./routes/permissionRoutes";
import roleRoutes from "./routes/roleRoutes";
import userRoleRoutes from "./routes/userRoleRoutes";
import instructorsRoutes from "./routes/instructorRoute";
import commissionRoutes from "./routes/commissionRoutes";
import studentRoutes from "./routes/studentRoutes";
import courseRoutes from "./routes/courseRoutes";
import degressRoutes from "./routes/degreeRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import lessonsRoutes from "./routes/lessonRoutes";
import promotionRoutes from "./routes/promotionRoutes";
import courseDocumentRoutes from "./routes/courseDocumentRoutes";
import courseVideoRoutes from "./routes/courseVideoRoutes";
import instructorCommissionRoutes from "./routes/instructorCommissionRoutes";
import paymentHistoryRoutes from "./routes/paymentHistoryRoutes";
import courseRatingRoutes from "./routes/courseRatingRoutes";
import enrollmentRoutes from "./routes/enrollmentRoutes";
import accessLogRoutes from "./routes/accessLogRoutes";
import advertisingRoutes from "./routes/advertisingRoutes";
import searchRoutes from "./routes/searchRoutes";
import notificationRoutes from "./routes/notificationRoute";
import combinedContentRoutes from "./routes/combinedContentRoutes";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.get("/favicon.ico", (_req, res) => {
  res.status(204).end();
});

app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/instructors", instructorsRoutes);
app.use("/api/user-roles", userRoleRoutes);
app.use("/api/comissions", commissionRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/degrees", degressRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/lessons", lessonsRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/course-documents", courseDocumentRoutes);
app.use("/api/course-videos", courseVideoRoutes);
app.use("/api/instructor-commissions", instructorCommissionRoutes);
app.use("/api/payment-history", paymentHistoryRoutes);
app.use("/api/course-ratings", courseRatingRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/access-logs", accessLogRoutes);
app.use("/api/advertising", advertisingRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/combined-content", combinedContentRoutes);

export default app;
