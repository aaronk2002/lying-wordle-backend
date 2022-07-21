const express = require('express');
const app = express();


//Cors Configuration
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE"
    )
    return res.status(200).json({})
  }
  next()
})


// Mongoose Connection
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://aaron25:7bFEmCUlpcgveK73@cluster0.3q4fpgn.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});



app.get('/', (req, res) => {
    res.send({data: 'Hello World, from express'});
});
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))