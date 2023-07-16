import express from 'express';
import usersRoutes from './routes/users.js';
import jobsRoutes from './routes/jobs.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);
app.use('/jobs', jobsRoutes);

app.get('/', (req, res) => {
    console.log("TEST");
    res.send('Hello from homepage.');
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));