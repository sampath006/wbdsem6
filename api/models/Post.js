const mongoose = require("mongoose");

//This is Posts schema for backend.
//Here we defined the data types for the backend.

const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
    },
    photo:{
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
},{timestamps:true});

module.exports = mongoose.model("Post",PostSchema);