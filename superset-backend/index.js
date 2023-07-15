import express from 'express';
import helmet from 'helmet';
import usersRoutes from './routes/users.js'

const app = express();
app.use(helmet());

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/users', usersRoutes);

app.get('/', (req, res) => {
    console.log("TEST");
    res.send('Hello from homepage.');
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));