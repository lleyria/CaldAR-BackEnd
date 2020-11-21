const express = require('express');
const path = require('path');
const app = express();

app.use('/api/buildings', require('./getBuildingsAll'));
app.use('/api/buildings/', require('./getBuildingById'));
app.use('/api/buildings/', require('./getBuildingsByAttribute'));
app.use('/api/buildings/', require('./deleteBuildingById'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));

