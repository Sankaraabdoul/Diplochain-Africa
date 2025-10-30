const express = require('express');
const router = express.Router();
const {
  issueDiploma,
  verifyDiploma,
  getAllDiplomas,
} = require('../controllers/diplomaController');

router.post('/issue', issueDiploma);
router.get('/verify/:serialNumber', verifyDiploma);
router.get('/', getAllDiplomas);

module.exports = router;