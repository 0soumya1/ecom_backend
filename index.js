require('./db/config');
const express = require("express");

const app = express();   

const cors = require("cors");
app.use(cors());              // used as a middleware 
app.use(express.json());     // postman as a middleware

app.use(require("./api/registerApi"));
app.use(require("./api/loginApi"));
app.use(require("./api/addProduct"));
app.use(require("./api/productList"));
app.use(require("./api/deleteProduct"));
app.use(require("./api/singleUpdateProduct"));
app.use(require("./api/searchProduct"));


app.get("/", (req, resp)=>{
    resp.send("hello world")
  })
  
app.listen(5000);