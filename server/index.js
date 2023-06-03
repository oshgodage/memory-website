const { Router } = require('express')
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors())
const postRoutes = require('./routes/posts');
app.use('/memory', postRoutes);

const CONNECTION_URL = 'mongodb+srv://Amazona:VinPeter29@cluster0.i9kvjke.mongodb.net/memoryDb?retryWrites=true&w=majority'
const PORT =5000;
mongoose.
        connect(CONNECTION_URL,{ useUnifiedTopology: true, useNewUrlParser: true })
        .then(()=>app.listen(PORT, ()=> console.log(`Server is running ${PORT}`)))
        .catch((error)=> console.log(error.message))
        

