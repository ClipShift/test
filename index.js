require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')

const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConnection');

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/', require('./routes/root'));
app.use('/hospital', require('./routes/hospitalRoutes'));
app.use('/schedule', require('./routes/scheduleRoutes'));
app.use('/file', require('./routes/fileRoutes'));

app.all('*', (req, res) => {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    else if(req.accepts('json')){
        res.json({message: '404 Not Found'});
    } else{
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log(`App running on ${PORT}`);
    });
});
