const allowedOrigins = require('./allowedOrigins');
const { format } = require('date-fns');

const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }
        else{
            callback(new Error(`${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}\tNot Allowed`))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;