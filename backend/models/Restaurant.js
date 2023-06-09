const mongoose = require('mongoose')

const { Schema } = mongoose;

const RestaurantSchema = new Schema({
    userId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },

  });

  module.exports = mongoose.model('restaurant',RestaurantSchema)