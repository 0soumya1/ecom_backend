const express = require("express");
const router = express.Router();
const Product = require("../db/Product");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

router.delete("/product/:id",verifyToken, async(req, resp)=>{
   let result = await Product.deleteOne({_id:req.params.id})
   resp.send(result);
});

function verifyToken(req, resp, next){           //middleware
   let token = req.headers['authorization'];
   if(token){
      token = token.split(" ")[1];
      Jwt.verify(token, jwtKey, (err, valid)=>{
       if(err){
          resp.status(401).send({result:"please provide valid token"})
       }else{
           next();
       }
      })
   }else{
       resp.status(403).send({result:"please add token with header"})
   }
   // console.log("middleware called", token)
}

module.exports = router;