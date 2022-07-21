const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;


// Cors Configuration
const whitelist = ["https://lie-wordle.netlify.app"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))


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