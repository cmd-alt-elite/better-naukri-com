import express from 'express';
import applicantsRoutes from './routes/applicants.js';
import recruitersRoutes from './routes/recruiters.js';
import jobsRoutes from './routes/jobs.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/applicants', applicantsRoutes);
app.use('/jobs', jobsRoutes);
app.use('/recruiters', recruitersRoutes);

app.get('/', (req, res) => {
    console.log("TEST");
    res.send('Hello from homepage.');
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));