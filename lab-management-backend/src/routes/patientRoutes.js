const express = require('express');
const { addPatient, getAllPatients } = require('../controllers/patientController');

const router = express.Router();

router.post('/patients', addPatient);
router.get('/patients', getAllPatients);

module.exports = router;
