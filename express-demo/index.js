const startupDebugger = require('debug')('app:startup');  // returns function for debugging messages in namespace ==> app:startup
const dbDebugger = require('debug')('app:db'); // another debugger for debugging database related messages
// if you only need one debugger in your file (more common than not), you can also use:
// const debug = require('debug')('app:startup');

const config = require('config'); // configuration for different environments
const morgan = require('morgan'); // logs http requests // everytime we send request to server logs requests
const helmet = require('helmet'); // Helmet secures Express apps by setting various HTTP headers.
const Joi = require('joi');  // returns a class // validate input
const logger = require('./logger');
const express = require('express');
const app = express(); //represents our application

app.set('view engine', 'pug'); // set view engine for application, when set, Express internally loads module (((don't hve to require it)))
// optional:
app.set('views', './views'); // default

// process ==> global object in Node that gives us access to the current process
// process.env.NODE_ENV ==>  returns the environment for this node application (if not set returns 'undefined')
// can set the NODE_ENV to: development, testing, staging or production
// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// app.get('env') // this is another way to get current env ==> if not set, returns 'development' by default
// console.log(`app: ${app.get('env')}`)

app.use(express.json()); //json => middleware ? 
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static('public')); //all of our static assets (css, images, etc) in this public folder
app.use(helmet());
// app.use(morgan('tiny'));  // everytime we send a request to the server, it will be logged

// if(app.get('env') === 'development') {
//     app.use(morgan('tiny'));  // because we only want to log HTTP requests in development mode
//     console.log('Morgan enabled...');
// };

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
};

// Once you have db working:
dbDebugger('Connected to the database...');


// Configuration
// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host')); // dot notation bc its an object
// console.log('Mail Password: ' + config.get('mail.password')); // don't do this in real apps!


app.use(logger) //custom middleware

app.use((req, res, next) => {
    console.log("Authenticating...");
    next();
});

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// app has following methods:
    // app.get()
    // app.post()
    // app.put()
    // app.delete()

// define a route:  path: /  route handler: callback function (req, res) => 
app.get('/', (req, res) => {
    // res.send('Hello World!!!');
    res.render('index', { title: 'My Express App', message: 'Hello' });
});

// endpoints
// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3]);
// });

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// single course:
// /api/courses/1
// app.get('/api/courses/:id', (req, res) => {
//     res.send(req.params.id)
// })

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('The course with the given ID was not found.'); // inspect page, network, command r ===> should show you the 404 (not found)
        return;
    }
    res.send(course);
});

// // essential route params
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params)
// })

// // optional params
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {

    // Joi class: 
    // define schema
    // shape of our object: type of properties (job of schema)
    // const schema = {
    //     name: Joi.string().min(3).required()
    // }

    // const result = Joi.validate(req.body, schema);
    // console.log(result);

    // if (!req.body.name || req.body.name.length < 3) {
    //     // 400 Bad Request
    //     res.status(400).send('Name is required and should be min 3 characters')
    //     return;
    // }

    //  replace above with Joi:

    // if (result.error) {
    //     res.status(400).send(result.error.details[0].message);
    // }

    const { error } = validateCourse(req.body); // result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    };

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    //look up course
    //if doesn't exist return 404 - not found

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.'); // inspect page, network, command r ===> should show you the 404 (not found)
        return;
    };

    // Validate
    // if invalid: return 400 - bad request

    // const result = validateCourse(req.body)
    const { error } = validateCourse(req.body); // result.error

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    };

    //Update Course
    course.name = req.body.name;

    //Return updated course to client
    res.send(course);


});

app.delete('/api/courses/:id', (req, res) => {

    //look up course
    //if doesn't exist return 404 - not found

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send('The course with the given ID was not found.'); // inspect page, network, command r ===> should show you the 404 (not found)
        return;
    };

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return deleted course
    res.send(course);

});

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema);
    
};


//environment variable: 
//PORT
const port = process.env.PORT || 3000;

// exporting a PORT:
// in terminal run:
// export PORT=5000

app.listen(port, () => console.log(`Listening on port ${port}...`));

