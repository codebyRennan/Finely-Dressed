const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const { getCurrentUser, updateCurrentUser } = require('../controllers/user.controller');

const router = express.Router();

router.get('/me', authMiddleware, getCurrentUser);
router.put('/me', authMiddleware, updateCurrentUser);

module.exports = router;
