const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3001;


app.use(morgan('dev'));

app.get('/test',(req,res) => {
    res.status(200).send({
        message : 'api is working fine',
    });
});





app.listen(PORT,(req,res)=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})