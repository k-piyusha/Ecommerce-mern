const express=require('express')
const slugify=require('slugify');
const { requireSignIn, userMiddleware } = require('../common-middleware');
const { addItemToCart } = require('../controller/cart');
const router=express.Router();

router.post('/user/cart/addItemToCart',requireSignIn,userMiddleware, addItemToCart)


module.exports=router;