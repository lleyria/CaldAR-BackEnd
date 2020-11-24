const express = require('express');
const app = express();

app.use('/technicians', require('./controllers/getAllTechnicians'));
app.use('/technicians', require('./controllers/deleteTechnicianById'));
app.use('/technicians', require('./controllers/getTechnicianById'));
app.use('/technicians', require('./controllers/getTechniciansByAttribute'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
