<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import permissionRoutes from "./routes/permissionRoutes";
import roleRoutes from "./routes/roleRoutes";
=======
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import permissionRoutes from './routes/permissionRoutes';
import degressRoutes from './routes/degreeRoutes';

>>>>>>> 36bae70480e82d7bb8ea03b8738519924b93c32b

dotenv.config();
const app = express();
app.use(express.json());

<<<<<<< HEAD
app.use("/api/users", userRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/roles", roleRoutes);
=======
app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/degrees', degressRoutes);
>>>>>>> 36bae70480e82d7bb8ea03b8738519924b93c32b

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("API is running on port", PORT);
  console.log("TURSO_URL:", process.env.TURSO_URL);
});
