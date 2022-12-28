const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');


// Mongoose Connection
const mongoose = require("mongoose");
mongoose.connect(/*process.env.DB_URI*/'mongodb+srv://aaron25:7bFEmCUlpcgveK73@cluster0.3q4fpgn.mongodb.net/?retryWrites=true&w=majority',
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


// Set Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Add API's
app.get('/', (req, res) => {
    res.send({data: 'Hello World, from express'});
});
const wordRouter = require('./routes/word.js');
app.use('/word', wordRouter);
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))