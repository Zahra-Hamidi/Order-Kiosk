const express = require('express');
const app = express();
const data = require('./data');
const mongoose = require('mongoose');



app.use(express.json());
app.use(express.urlencoded({extended:true}));


mongoose.connect('mongodb://localhost:27017/selfOrderKiosk',{useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const Product = mongoose.model('products',new mongoose.Schema({
    name:String,
    description:String,
    image:String,
    price:Number,
    calorie:Number,
    category:String
}));

app.get('/api/products/seed',async (req,res)=>{
    const products = await Product.insertMany(data.products);
    res.send({products});
});

app.get('/api/products',async(req,res)=>{
    const {category} = req.query;
    const products = await Product.find(category ? {category} : {});
    res.send(products);
});

app.get('/api/categories',(req,res)=>{
    res.send(data.categories);
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server is ready');
})