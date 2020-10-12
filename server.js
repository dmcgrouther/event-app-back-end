const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const routes = require('./routes');

const corsOptions = {
    origin: [`http://localhost:3000`],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions))

//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.get('/', (req, res) => res.send('Hello David!'))
// app.use('/api/v1', routes);
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/events', routes.events);
// app.use('/api/v1/events', routes.events);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`))
