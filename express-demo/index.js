const express = require('express');
const app = express(); //represents our application

// app has following methods:
    // app.get()
    // app.post()
    // app.put()
    // app.delete()

// define a route:  path: /  route handler: callback function (req, res) => 
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// endpoints
app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.listen(3000, () => console.log('Listening on port 3000...'));

