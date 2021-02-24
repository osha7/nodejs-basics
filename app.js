// function sayHello(name) {
//     console.log('Hello ' + name)
// }

// sayHello('Osha')

// in terminal run:
// node app.js
//  ===> Hello Osha

// console.log(window)  // in node we don't have window or document objects

//----------------GLOBAL OBJECT (global scope - accessed anywhere in anyfiles)---------------------------------

// console.log() // global object

// setTimeout() // call function after delay
// clearTimeout()

// setInterval() // call function repetively 
// clearInterval() // stop the function from being called repetively

// window // browsers have 
// window.console.log // or console.log 

// window.setTimeout()

// var message = ''
// window.message

//in node we don't have window object
//we only have global

// global.setTimeout // is good 
// console.log(global.message) //undefined
// variables are only available in this file in node.js


// -----------------Modules------------------------------------

// don't define variables / functions in global scope
// they'll get overwritten

// every file in node app is considered a module
// variables and functions defined in a file are scoped to that module only 
// they're private

// otherwise export it and make it public

// console.log(module)
// //===>
//         // Module {
//         //     id: '.',
//         //     path: '/Users/oshagroetz/Development/nodejs/nodejs-basics',
//         //     exports: {},
//         //     parent: null,
//         //     filename: '/Users/oshagroetz/Development/nodejs/nodejs-basics/app.js',
//         //     loaded: false,
//         //     children: [],
//         //     paths: [
//         //     '/Users/oshagroetz/Development/nodejs/nodejs-basics/node_modules',
//         //     '/Users/oshagroetz/Development/nodejs/node_modules',
//         //     '/Users/oshagroetz/Development/node_modules',
//         //     '/Users/oshagroetz/node_modules',
//         //     '/Users/node_modules',
//         //     '/node_modules'
//         //     ]
//         // }

//---------------------CREATING A MODULE--------------

// // require('./logger.js')
// const log = require('./logger') // make sure 'const'

// // console.log(logger)  //===> { log: [Function: log] }

// // logger.log('this message') //===> this message

// log('message')



//---------------------PATH MODULE--------------

// const path = require('path') //node assumes this is a built in module

// var pathObj = path.parse(__filename)

// console.log(pathObj)

//===> 
    // {
    //     root: '/',
    //     dir: '/Users/oshagroetz/Development/nodejs/nodejs-basics',
    //     base: 'app.js',
    //     ext: '.js',
    //     name: 'app'
    // }


//---------------------OS MODULE--------------

// const os = require('os');

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// // console.log('Total Memory: ' + totalMemory)

// //Template String  --- build a string without concatination
// //ES6 / ES2015: ECMAScript 6
// console.log(`Total Memory: ${totalMemory}`)
// console.log(`Free Memory: ${freeMemory}`)

// console.log(totalMemory - freeMemory) //used memory

// // 17179869184 total
// //   139505664 free
// // 17040363520 used


//---------------------File System MODULE--------------

// const fs = require('fs');

// const files = fs.readdirSync('./') //returns all files and folder in current folder

// console.log(files) // [ '.git', 'ReadMe.md', 'app.js', 'logger.js' ]

// fs.readdir('./', function(err, files) {
//     if(err) console.log('Error', err)
//     // Error [Error: ENOENT: no such file or directory, scandir '$'] {
//     //     errno: -2,
//     //     code: 'ENOENT',
//     //     syscall: 'scandir',
//     //     path: '$'
//     //   }
//     else console.log('Result', files) // Result [ '.git', 'ReadMe.md', 'app.js', 'logger.js' ]
// })

//---------------------Events MODULE--------------

// const EventEmitter = require('events') // this is a CLASS (container for props and methods)
// const emitter = new EventEmitter ();

// // emitter.emit(); //emit: make a noise or produce something - signalling an event has happened

// //  Register a listener
// emitter.on('messageLogged', function() {
//     console.log('listener called')
// }) //addListener

// emitter.emit('messageLogged'); //===> listener called

//---------------------Event Arguments-------------------

// const EventEmitter = require('events') // this is a CLASS (container for props and methods)
// const emitter = new EventEmitter ();

// // emitter.emit(); //emit: make a noise or produce something - signalling an event has happened

// //  Register a listener
// emitter.on('messageLogged', (arg) => { //e, eventArg
//     console.log('listener called', arg)
// }) //addListener

// emitter.emit('messageLogged', { id: 1, url: 'http://' }); //listener called { id: 1, url: 'http://' }

// // Raise: logging (data: message)

// ---------------------Extending EventEmiiter-----------------------------

// const EventEmitter = require('events') // this is a CLASS (container for props and methods)
// // const emitter = new EventEmitter ();

// const Logger = require('./logger')
// const logger = new Logger()
// // log('new message') //===> new message 
// // ^^event listener was not called

// logger.on('messageLogged', (arg) => { //e, eventArg
//     console.log('listener called', arg)
// })


// logger.log('class message')
//     // class message
//     // listener called { id: 1, url: 'http://' }


//---------------------HTTP MODULE--------------------

const http = require('http');

// const server = http.createServer() // server is an EventEmitter

// server.on('connection', (socket) => {
//     console.log('New connection')
// })

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Hello World');
        res.end()
    }

    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]))
        res.end()
    }
})

server.listen(4000)

console.log("Listening on port 4000...")