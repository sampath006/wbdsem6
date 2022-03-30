const mongoose = require("mongoose")


//This is Events schema for backend.
//Here we defined the data types for the backend.

const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    photo:{
        type:String,
        required:false
    },
    desc:{
        type:String,
        required:true
    },
    prize:{
        type:String,
        required:false
    },
    username:{
        type:String,
        required:true,
    },
    categories:{
        type:Array,
        required:false
    },
    venue:{
        type:String,
        required:true
    },
    
},{timestamps:true});

module.exports = mongoose.model("Event",EventSchema);