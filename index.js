const express = require('express');
const app = express();

app.use('/api/boilertypes', require('./controllers/getAllBoilerTypes'));
app.use('/api/boilertypes', require('./controllers/getBoilerTypeById'));
app.use('/api/boilertypes', require('./controllers/getBoilerTypesByAttribute'));
app.use('/api/boilertypes', require('./controllers/deleteBoilerById'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started'));