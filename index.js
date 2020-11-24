const express = require('express');
const app = express();

app.use('/api/buildings', require('./controllers/getBuildingsAll'));
app.use('/api/buildings/', require('./controllers/getBuildingById'));
app.use('/api/buildings/', require('./controllers/getBuildingsByAttribute'));
app.use('/api/buildings/', require('./controllers/deleteBuildingById'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));
 
