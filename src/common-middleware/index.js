const jwt = require("jsonwebtoken");
const User = require("../models/user");
const SecretKey='MERNSECRET'

exports.requireSignIn = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token,SecretKey);
    req.user = user;
    
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
   console.log(req.user)
  next();
};

exports.userMiddleware = (req, res, next) => {
  // if (req.user.role !== "user") {
  //   return res.status(400).json({ message: "User access denied" });
  // }
  User.findOne({_id:req.user._id})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error})
        if(user){
            const Role=user.role;
            console.log(Role)
            if (Role !== 'user') {
                return res.status(400).json({ message: "User access denied" });
                // if (req.user.role !== "super-admin") {
                //   return res.status(400).json({ message: "Admin access denied" });
                // }
              }
        }else{
            return res.status(400).json({ message:"Something went wrong"}) 
        }
    })
  next();
};

exports.adminMiddleware = (req, res, next) => {
    
    User.findOne({_id:req.user._id})
    .exec((error,user)=>{
        if(error) return res.status(400).json({error})
        if(user){
            const Role=user.role;
            console.log(Role)
            if (Role !== 'admin') {
                return res.status(400).json({ message: "Admin access denied" });
                // if (req.user.role !== "super-admin") {
                //   return res.status(400).json({ message: "Admin access denied" });
                // }
              }
        }else{
            return res.status(400).json({ message:"Something went wrong"}) 
        }
    })

  
  next();
};
