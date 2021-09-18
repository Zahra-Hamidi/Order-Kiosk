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
});

const Order = mongoose.model('Order', new mongoose.Schema({
    number:{type:Number , default:0},
    orderType:String,
    paymentType: String,
    isPaid:{type:Boolean,default:false},
    isReady:{type:Boolean,default:false},
    inProgress:{type:Boolean,default:false},
    isCanceled:{type:Boolean,default:false},
    isDelivered:{type:Boolean,default:false},
    itemPrice:Number,
    taxPrice:Number,
    totalPrice:Number,
    orderItems:[
        {
            name:String,
            price:Number,
            quantity:Number
        }
    ]
},
{
    timestamps:true
}

))

app.post('/api/orders',async (req,res)=>{
    const lastOrder = await Order.find().sort({number : -1}).limit(1);
    const lastNumber = lastOrder.length === 0 ? 0 :lastOrder[0].number;
    if (!req.body.orderType || !req.body.paymentType || !req.body.orderItems || req.body.orderItems.length === 0) {
        return res.send({message : 'Data is required'});        
    }
    const order = await Order({...req.body,number:lastNumber + 1}).save();
    res.send(order);
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('Server is ready');
})