const express = require('express');
const path = require('path');
const app = express();

app.use('/api/buildings', require('./getBuildingsAll'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));

