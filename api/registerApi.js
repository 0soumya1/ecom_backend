const express = require("express");
const router = express.Router();
const User = require("../db/User");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

router.post('/register', async (req, resp)=>{
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password 
    Jwt.sign({result}, jwtKey, {expiresIn:"4h"}, (err, token)=>{
        if(err){
         resp.send({result:"something went wrong"});
        }
         resp.send({result, auth:token});
       })
});

module.exports = router;