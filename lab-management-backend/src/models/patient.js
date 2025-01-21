const pool = require('../config/db');

const createPatient = async (name, age, gender) => {
    const query = 'INSERT INTO patients (name, age, gender) VALUES ($1, $2, $3) RETURNING *';
    const values = [name, age, gender];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const getPatients = async () => {
    const { rows } = await pool.query('SELECT * FROM patients');
    return rows;
};

module.exports = { createPatient, getPatients };
