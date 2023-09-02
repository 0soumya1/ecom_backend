const express = require("express");
const router = express.Router();
const User = require("../db/User");

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

router.post('/login', async (req, resp)=>{
    console.log(req.body);
    if(req.body.password && req.body.email){
        let user =await User.findOne(req.body).select("-password");
        if(user){
           Jwt.sign({user}, jwtKey, {expiresIn:"4h"}, (err, token)=>{
            if(err){
             resp.send({result:"something went wrong"});
            }
             resp.send({user, auth:token});
           })
        }else{
            resp.send({result:"no user found"});
        }
    }else{
        resp.send({result:"no user found"});
    }
});

module.exports= router;