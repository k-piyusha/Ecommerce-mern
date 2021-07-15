const express=require('express')
const app=express()
const port=8080
const bodyParser=require('body-parser')
const mongoose = require('mongoose');
const path=require('path')
require('dotenv').config()

mongoose.connect('mongodb+srv://root:root@cluster0.jafpl.mongodb.net/EcommerceDB?retryWrites=true&w=majority',
 {useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
    console.log("Database connected")
});

//routes
const authRoutes=require('./routes/auth')
const adminRoutes=require('./routes/admin/auth')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
const cartRoutes=require('./routes/cart')

app.use(express.json())
app.use('/public',express.static(path.join(__dirname,'uploads')))
app.use('/api',authRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoryRoutes)
app.use('/api',productRoutes)
app.use('/api',cartRoutes)

app.get('/data',(req,res,next)=>{
    // res.status(200).json({
    //     message : req.body
    // });
    res.send(req.body)
});

app.listen(port,()=>{
    console.log("Server running on port"+port)
});