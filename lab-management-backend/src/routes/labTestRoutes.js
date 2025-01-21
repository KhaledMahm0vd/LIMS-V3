const express = require('express');
const { addLabTest, getAllLabTests } = require('../controllers/labTestController');

const router = express.Router();

router.post('/lab-tests', addLabTest);
router.get('/lab-tests', getAllLabTests);

module.exports = router;
