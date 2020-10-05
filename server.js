const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const routes = require('./routes');

//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.get('/', (req, res) => res.send('Hello David!'))
// app.use('/api/v1', routes);
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/events', routes.events);
// app.use('/api/v1/events', routes.events);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`))
