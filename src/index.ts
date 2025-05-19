import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
    res.send('Hello World! ' + new Date().toLocaleTimeString());
});

app.listen(PORT, () => {
    console.log('API is running on port', PORT);
    console.log('TURSO_URL:', process.env.TURSO_URL);
})