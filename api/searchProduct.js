const express = require("express");
const Product = require("../db/Product");
const router = express.Router();

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

router.get("/search/:key", verifyToken, async (req,resp)=>{
    let result = await Product.find({
        "$or":[
            {name: {$regex: req.params.key}},
            {company: {$regex: req.params.key}},
            {category: {$regex: req.params.key}}
        ]
    })
    resp.send(result);
})

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