const express = require('express');
const app = express();
const PORT = 3001;

app.get('/test',(req,res) => {
    res.status(200).send({
        message : 'api is working',
    });
});





app.listen(PORT,(req,res)=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})