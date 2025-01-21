const express = require('express');
const cors = require('cors');
const patientRoutes = require('./routes/patientRoutes');
const labTestRoutes = require('./routes/labTestRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', patientRoutes);
app.use('/api', labTestRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
