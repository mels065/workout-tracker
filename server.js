const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const MongoStore = require('connect-mongo');

const routes = require('./routes');

async function init() {
    const app = express();
    const PORT = process.env.PORT || 3001;

    app.use(session({
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URL
        })
    }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.static(path.join(__dirname, 'public')));

    app.use('/', routes);

    try {
        await mongoose.connect(
            process.env.MONGODB_URL || 'mongodb://localhost/workout',
            {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              useCreateIndex: true,
              useFindAndModify: false
            }
          );
          
        app.listen(PORT, () => {
            console.log('\x1b[32m', `Server listening on port ${PORT}`, '\x1b[0m');
        });
    } catch (err) {
        console.error(err);
    }
}

init();
