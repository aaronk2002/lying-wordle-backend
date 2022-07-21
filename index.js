const express = require('express');
const app = express();


// Cors Configuration
const corsMiddleware = (req, res, next) => {
    res = applyCorsHeaders(res);
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    next()
}  
const applyCorsHeaders = res => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*')
    // or res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return res;
}
app.use(corsMiddleware);


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