const express = require('express');
const app = express();
const getAllBoilers = require('./controllers/getAllBoilers');
const getBoilersById = require('./controllers/getBoilerById');
//app.use('/api/boilers', getAllBoilers);
app.use('/api/boilers', getBoilersById);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));