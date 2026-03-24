const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

function generateToken(userId) {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
}

function formatAuthResponse(user) {
  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      preferences: user.preferences,
      bodyProfile: user.bodyProfile,
      theme: user.theme,
    },
  };
}

async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nome, e-mail e senha sao obrigatorios.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'A senha deve ter pelo menos 6 caracteres.' });
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });

  if (existingUser) {
    return res.status(409).json({ message: 'Ja existe uma conta com esse e-mail.' });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    passwordHash,
  });

  return res.status(201).json(formatAuthResponse(user));
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha sao obrigatorios.' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(401).json({ message: 'Credenciais invalidas.' });
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return res.status(401).json({ message: 'Credenciais invalidas.' });
  }

  return res.json(formatAuthResponse(user));
}

module.exports = {
  register,
  login,
};
