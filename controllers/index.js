const express = require('express');
const app = express();
const getAllBoilers = require('./getAllBoilers');
app.use('/api/boilers', getAllBoilers);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));