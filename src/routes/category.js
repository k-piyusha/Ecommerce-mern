const express=require('express')
const slugify=require('slugify');
const { requireSignIn, adminMiddleware } = require('../common-middleware');
const { addCategory, getCategories } = require('../controller/category');
const Category = require('../models/category');
const router=express.Router();
const multer=require('multer');
const shortid=require('shortid')
const path=require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname),'uploads') )
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate()+'-'+file.originalname)
    }
  })

const upload=multer({storage})

router.post('/category/create',requireSignIn,adminMiddleware,upload.single('categoryImage'), addCategory)
router.get('/category/getCategory',getCategories)

module.exports=router;