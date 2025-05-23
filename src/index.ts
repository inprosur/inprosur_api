import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import permissionRoutes from "./routes/permissionRoutes";
import roleRoutes from "./routes/roleRoutes";
import degressRoutes from "./routes/degreeRoutes";
import categoryRoutes from "./routes/categoryRoutes"; 
import subcategoryRoutes from "./routes/subcategoryRoutes";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/degrees", degressRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API is running on port", PORT);
  console.log("TURSO_URL:", process.env.TURSO_URL);
});
