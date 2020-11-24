const express = require('express');
const app = express();

app.use('/appointments', require('./controllers/getAllAppointments'));
app.use('/appointments', require('./controllers/deleteAppointmentById'));
app.use('/appointments', require('./controllers/getAppointmentById'));
app.use('/appointments', require('./controllers/getAppointmentByAttribute'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
