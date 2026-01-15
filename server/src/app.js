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
const productRouter = require("./routers/productRouter");


const rateLimiter = rateLimit({
    windowMs : 1*60*1000,  // set in 1 min
    max : process.env.NODE_ENV === "production" ? 5 : 200,  // set the highest limit 
    message : 'Too many request from this IP.Try again later.',
});


app.use(morgan('dev'));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));





//app.use(xssClean());
app.use(rateLimiter);

app.use("/api/products", productRouter);

app.use('/api/users',userRouter);

app.use('/api/seed',seedRouter);



app.get('/test', (req,res) => {
    res.status(200).send({
        message : 'api is working fine',
    });
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "EbUy backend is running",
  });
});



// server error handling
app.use((err,req,res,next) => {
    return errorResponse(res, {
        statusCode : err.status,
        message : err.message,
    });
});


 // client error handling
app.use((req,res,next) => {
    next(createError(404, 'route not found'));
});

module.exports = app;