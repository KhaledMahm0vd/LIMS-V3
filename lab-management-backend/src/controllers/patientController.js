const { createPatient, getPatients } = require('../models/patient');

const addPatient = async (req, res) => {
    const { name, age, gender } = req.body;
    try {
        const patient = await createPatient(name, age, gender);
        res.status(201).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await getPatients();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addPatient, getAllPatients };
