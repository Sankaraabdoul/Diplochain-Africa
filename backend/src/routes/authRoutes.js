const express = require('express');
const router = express.Router();
const {
  login,
  verifySession,
  logout,
  getUniversities
} = require('../controllers/authController');

router.post('/login', login);
router.post('/verify', verifySession);
router.post('/logout', logout);
router.get('/universities', getUniversities);

module.exports = router;