const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const PORT = process.env.PORT || 4000;
require('dotenv').config();

const routes = require('./routes')

const corsOptions = {
    "Access-Control-Allow-Origin": 'http://localhost:3000',
    "Access-Control-Allow-Headers": true,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

//bodyparser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    store: new MongoStore({ url: "mongodb://localhost:27017/event-app" }),
    secret: "event-app",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
}));

// app.get('/', (req, res) => res.send('Hello David!'))
// app.use('/api/v1', routes);
app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/events', routes.events);
// app.use('/api/v1/events', routes.events);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`))
