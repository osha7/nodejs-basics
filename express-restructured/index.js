const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');

const musicians = require('./routes/musicians');
const home = require('./routes/home');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug'); 
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));   
app.use(helmet());
app.use('/api/musicians', musicians);
app.use('/', home);

// Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
};

app.use(logger);

app.use((req, res, next) => {    // this function should go in its own file
    console.log("Authenticating...");
    next();
});

app.listen(port, () => console.log(`Listening on port ${port}`));