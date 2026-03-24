const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  }),
);
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erro interno do servidor.' });
});

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}.`);
    });
  })
  .catch((error) => {
    console.error('Falha ao iniciar o servidor:', error.message);
    process.exit(1);
  });
