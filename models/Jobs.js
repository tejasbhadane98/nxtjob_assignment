const mongoose = require("mongoose")
const  Schema = mongoose.Schema;


const JobsSchema = new Schema ({
    title :{type:String,required:true, trim:true},
    company:{type:String, required:true, trim:true},
    location:{type:String, required:true, trim:true},
    salary:{type:Number, required:true},
    description:{type:String, required:true, trim:true},
})

const JobsModel = mongoose.model("Jobs", JobsSchema);

module.exports = JobsModel;