const express=require('express');
const { signup,signin } = require('../../controller/admin/auth');
const { validateSignUpRequest, isRequestValidated,validateSignInRequest } = require('../../validators/auth');

const router=express.Router();


router.post('/admin/signin',validateSignInRequest,isRequestValidated, signin);

router.post('/admin/signup',validateSignUpRequest,isRequestValidated,signup);

// router.post('/profile',requireSignIn,(req,res)=>{
//     res.status(200).json({user: "profile"})
// });

module.exports=router;