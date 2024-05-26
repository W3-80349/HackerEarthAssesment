const express = require("express");
const routes = require("./router/routes")
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected..."))
    .catch(err => console.log(err.message))

app.use("/", routes);

app.listen(process.env.PORT, ()=>{
    console.log("listening on port " + process.env.PORT);
})