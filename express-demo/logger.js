
const log = (req, res, next) => {
    console.log("Logging...") //req.body
    next() // passes control to next middleware function
};

module.exports = log;
// export default log; //ES6 way to write above

