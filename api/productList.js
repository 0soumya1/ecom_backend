const express = require("express");
const Product = require("../db/Product");
const router = express.Router();

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

router.get("/products",verifyToken, async (req, resp)=>{
    let products = await Product.find();
    if(products.length>0){
        resp.send(products);
    }else{
        resp.send({result:"No products found"});
    }
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