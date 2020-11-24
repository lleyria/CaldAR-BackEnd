const express = require('express');
const app = express();

app.use('/appointment', require('./controllers/getAllAppointments'));
app.use('/appointment', require('./controllers/deleteAppointmentsById'));
app.use('/appointment', require('./controllers/getAppointmentById'));
app.use('/appointment', require('./controllers/getAppointmentByAttribute'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
