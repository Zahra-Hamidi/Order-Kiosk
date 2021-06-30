const express = require('express');
const app = express();
const data = require('./data');

app.get('/api/categories',(req,res)=>{
    res.send(data.categories);
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server is ready');
})