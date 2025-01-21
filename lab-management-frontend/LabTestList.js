import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LabTestList = () => {
    const [labTests, setLabTests] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/lab-tests')
        .then(response => setLabTests(response.data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
        <h2>Lab Tests</h2>
        <ul>
        {labTests.map(test => (
            <li key={test.id}>{test.test_name} - {test.description}</li>
        ))}
        </ul>
        </div>
    );
};

export default LabTestList;
