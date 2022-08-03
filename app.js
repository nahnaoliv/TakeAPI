const express = require('express');
const app = express();
const router = require("./Router/router");
const porta = process.env.PORT || 5000;

app.use(router);

app.listen(porta, function(req, res){
  console.log("Porta aberta: http://localhost:5000/");
});
