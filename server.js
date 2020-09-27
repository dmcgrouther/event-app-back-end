const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => res.send('Hello David!'))

mongoose.connect('mongodb://localhost/event-app', { useNewUrlParser: true, useUnifiedTopology: true });

// const db = require(`./models`);


const routes = require('./routes')

// const server = app.listen(`Server connected at http://localhost:${PORT}`);
app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`))
