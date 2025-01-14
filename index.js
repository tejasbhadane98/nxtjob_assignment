const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"config.env"})
}

mongoose.connect(
    process.env.MONGO_URI
).then(() => console.log('Connected To the Database'));

const jobs = require("./routes/jobs")
app.use('/api', jobs);

app.listen(process.env.PORT || 8000, () => {
    console.log("Server running on port 8000");
});