// var x=;
// logging our messages


// private: 
    // var url = 'http://mylogger.io/log'

    // function log(message) {
    //     // send http request:

    //     console.log(message)
    // }



// // public: 
//     var url = 'http://mylogger.io/log' //implementation detail don't need to export

//     function log(message) {
//         // send http request:

//         console.log(message)
//     }

//     // module.exports.log = log
//     //module.exports.url = url
//     // module.exports.endPoint = url

//     module.exports = log


// // module wrapper function:

// // (function (exports, require, module, __filename, __dirname) {

//     console.log(__filename) /// Users/oshagroetz/Development/nodejs/nodejs-basics/logger.js
//     console.log(__dirname) /// Users/oshagroetz/Development/nodejs/nodejs-basics

//     var url = 'http://mylogger.io/log' //implementation detail don't need to export
    
//     function log(message) {
//         // send http request:
    
//         console.log(message)
//     }
    
//     // module.exports.log = log
//     //module.exports.url = url
//     // module.exports.endPoint = url
    
//     module.exports = log
    
// // })


// ---------------------Extending EventEmiiter-----------------------------

const EventEmitter = require('events') // this is a CLASS (container for props and methods)
// const emitter = new EventEmitter ();

var url = 'http://mylogger.io/log' //implementation detail don't need to export

class Logger extends EventEmitter {
    log(message) { //method
        // send http request:
        console.log(message)
    
        // Raise an event
        this.emit('messageLogged', { id: 1, url: 'http://' }); //listener called { id: 1, url: 'http://' }
    
    }
}

module.exports = Logger //export logger class

