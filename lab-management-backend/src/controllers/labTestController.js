const { createLabTest, getLabTests } = require('../models/labTest');

const addLabTest = async (req, res) => {
    const { testName, description } = req.body;
    try {
        const labTest = await createLabTest(testName, description);
        res.status(201).json(labTest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllLabTests = async (req, res) => {
    try {
        const labTests = await getLabTests();
        res.status(200).json(labTests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addLabTest, getAllLabTests };
