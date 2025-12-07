const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const createError = require('http-errors');
//const xssClean = require('xss-clean');
const rateLimit = require('express-rate-limit');
const userRouter = require('./routers/userRouter');
const { seedRouter } = require('./routers/seedRouter');
const { errorResponse } = require('./controllers/responseController');


const rateLimiter = rateLimit({
    windowMs : 1*60*1000,  // set in 1 min
    max : 5,  // set the highest limit 
    message : 'Too many request from this IP.Try again later.',
});


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(xssClean());
app.use(rateLimiter);


app.use('/api/users',userRouter);

app.use('/api/seed',seedRouter);



app.get('/test', (req,res) => {
    res.status(200).send({
        message : 'api is working fine',
    });
});




// client error handling
app.use((req,res,next) => {
    next(createError(404, 'route not found'));
});

// server error handling
app.use((err,req,res,next) => {
    return errorResponse(res, {
        statusCode : err.status,
        message : err.message,
    });
});

 

module.exports = app;