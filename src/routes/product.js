const express=require('express')
const multer=require('multer');
const shortid=require('shortid')
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { createProduct } = require('../controller/product');
const path=require('path')

const router=express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads') )
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+file.originalname)
    }
  })
  const upload=multer({storage})

router.post('/product/create',requireSignIn,adminMiddleware,upload.array('productPicture'), createProduct)
//router.get('/category/getCategory',getCategories)

module.exports=router;