import React from 'react';
import PatientList from './PatientList';
import LabTestList from './LabTestList';

function App() {
  return (
    <div className="App">
    <h1>Laboratory Management System</h1>
    <PatientList />
    <LabTestList />
    </div>
  );
}

export default App;
