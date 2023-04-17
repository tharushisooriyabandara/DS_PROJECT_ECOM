const express = require("express");
const app = express();
const path = require("path")
const bodyParser = require("body-parser");
var cors = require('cors')

const PORT = 4002;

var db_connection = require("./database/index");

db_connection()

app.use(cors()) // Use this after the variable declaration
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const categoryRoute = require("./routes/index")

app.use("/api" , categoryRoute);



app.listen(PORT , ()=>{
    console.log(`Category service is running on PORT ${PORT}`);
})