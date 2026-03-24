const mongoose = require('mongoose');

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error('MONGO_URI nao definida no arquivo .env');
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB conectado com sucesso.');
}

module.exports = connectDB;
