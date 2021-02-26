const express = require('express');
const app = express(); //represents our application

app.use(express.json()); //json => middleware ? 
const courses = [
    { id: 1, name: 'courses1' },
    { id: 2, name: 'courses2' },
    { id: 3, name: 'courses3' },
];

// app has following methods:
    // app.get()
    // app.post()
    // app.put()
    // app.delete()

// define a route:  path: /  route handler: callback function (req, res) => 
app.get('/', (req, res) => {
    res.send('Hello World!!!');
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
    if (!course) res.status(404).send('The course with the given ID was not found.') // inspect page, network, command r ===> should show you the 404 (not found)
    res.send(course)
});

// // essential route params
// app.get('/api/posts/:year/:month', (req, res) => {
//     res.send(req.params)
// })

// // optional params
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query)
})

app.post('/api/courses', (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});




//environment variable: 
//PORT
const port = process.env.PORT || 3000

// exporting a PORT:
// in terminal run:
// export PORT=5000

app.listen(port, () => console.log(`Listening on port ${port}...`));

