const express = require('express');
const app = express();
const getAllBoilers = require('./controllers/getAllBoilers');
const getBoilersById = require('./controllers/getBoilerById');
const getBoilersByAttribute = require('./controllers/getBoilersByAttribute');
const deleteBoilerById = require('./controllers/deleteBoilerById');
app.use('/api/boilers', getAllBoilers);
app.use('/api/boilers', getBoilersById);
app.use('/api/boilers', getBoilersByAttribute);
app.use('/api/boilers', deleteBoilerById);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));