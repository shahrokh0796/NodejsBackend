// Start a working express server

// let express = require('express');
// const app = express();
// app.get("/", (req, res) => {
//     res.send("Hello Express");
// });
// =======================================================
// Serve an HTML file

// let express = require('express');
// const app = express();

// const absolutePath = __dirname+"/views/index.html";
// app.get('/', (req, res) => {
//     res.sendFile(absolutePath);
// });
// console.log("Hello world");

// ==========================================================
// Serve Static Assets

// const express = require('express');
// const app = express();
// const absolutePath = __dirname+"/views/index.html";
// app.get('/', (req, res) => {
//     res.sendFile(absolutePath);
// });
// app.use("/public",express.static(__dirname+"/public"));
// ===========================================================
// Serve JSON on a Specific Route

// const express = require("express");
// const app = express();

// const absolutePath = __dirname+"/views/index.html";
// app.get('/', (req, res) => {
//     res.sendFile(absolutePath);
// });
// app.use("/public", express.static(__dirname+'/public'));
// app.get("/json", (req, res) => {
//     res.json({"message": "Hello json"});
             
// });

// =============================================================
// require('dotenv').config();

// const express = require('express');
// const app = express();
// const absolutePath = __dirname+"/views/index.html";
// app.get("/", (req, res) => {
//     res.sendFile(absolutePath);
// });

// app.use("/public", express.static(__dirname+"/public"));
// app.get("/json", (req, res) => {
//     let message = {"message": "Hello json"};
//     if(process.env.MESSAGE_STYLE=== 'uppercase') {
//         message.message = message.message.toUpperCase();
//     }
//     res.json(message);
// });
// =================================================================
// Implement a Root-Level Request Logger Middleware
// const express = require('express');
// const app = express();

// app.use(function middleware(req, res, next){
//   var string = req.method + " " + req.path + " - " + req.ip;
//   console.log(string);
//   next();
// });

// ==================================================================
// Chain Middleware to Create a Time Server

// const express = require("express");
// const app = express();

// const absolutePath = __dirname+"/views/index.html";
// app.get("/", (req, res)=> {
//   res.sendFile(absolutePath);
// });
// app.get('/now', (req, res, next) => {
//   req.time = new Date().toString();
//   next();
// }, (req, res) => {
//     res.send({time: req.time});
// });
// app.use("/public", express.static(__dirname+"/public"));

// ============================================================
// Get Route Parameter Input from the Client

// const express = require("express");
// const app = express();
// const absolutePath = __dirname+"/views/index.html";
// app.get("/", (req, res) => {
//   res.sendFile(absolutePath);
// });

// app.use("/public", express.static(__dirname+"/public"));

// app.get("/:word/echo", (req, res) => {
//   const { word } = req.params;
//   res.json({
//     echo: word
//   });
// });
// =============================================================
// Get Query Parameter Input from the Client

// const express = require("express");
// const app = express();

// let absolutePath = __dirname+"/views/index.html";
// app.use('/public', express.static(__dirname+"/public"));
// app.get("/", (req, res) => {
//   res.sendFile(absolutePath);
// });

// app.get('/name', (req, res) => {
//   const {first: firstName, last: lastName} = req.query;
//   res.json({
//      name: `${firstName} ${lastName}`
//   });
// });
// ==============================================================
// Use body-parser to Parse Post request 
// const bodyParser = require("body-parser");
// const express = require("express");
// const app = express();

// const absolutePath = __dirname+"/views/index.html";

// app.use("/public", express.static(__dirname+"/public"))
// app.get('/', (req, res) => {
//   res.sendFile(absolutePath);
// });
// let postFunction = bodyParser.urlencoded({extended: false});
// app.use(postFunction);
// =============================================================
// Get Data from POST Requests
const bodyParser = require("body-parser");
const express = require('express');
const app = express();
const absolutePath = __dirname+"/views/index.html";

app.use("/public", express.static(__dirname+"/public"));
app.get("/", (req, res)=> {
  res.sendFile(absolutePath);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});























 module.exports = app;
