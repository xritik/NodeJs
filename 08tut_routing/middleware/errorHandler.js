const {logEvents} = require('./logEvents');

const errorHandler = (err, req, res, next) => {
    logEvents(`${req.method}\t${err.name}: ${err.message}`, 'errLog.txt')
    console.error(err.stack)
    res.status(500).send(err.message);
}

module.exports = errorHandler;