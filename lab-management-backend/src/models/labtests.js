const pool = require('../config/db');

const createLabTest = async (testName, description) => {
    const query = 'INSERT INTO lab_tests (test_name, description) VALUES ($1, $2) RETURNING *';
    const values = [testName, description];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const getLabTests = async () => {
    const { rows } = await pool.query('SELECT * FROM lab_tests');
    return rows;
};

module.exports = { createLabTest, getLabTests };
