import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/patients')
        .then(response => setPatients(response.data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
        <h2>Patients</h2>
        <ul>
        {patients.map(patient => (
            <li key={patient.id}>{patient.name} - {patient.age} years old</li>
        ))}
        </ul>
        </div>
    );
};

export default PatientList;
