const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = 4000;
const routes = require('./routes/auth')

//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello David!'))
app.use('/api/v1', routes);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`))
