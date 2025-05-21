import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import permissionRoutes from './routes/permissionRoutes';;


dotenv.config();
const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/permissions', permissionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('API is running on port', PORT);
    console.log('TURSO_URL:', process.env.TURSO_URL);
})