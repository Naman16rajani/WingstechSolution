let mongoose = require('mongoose');
const { User } = require('./User');

let BlogSchema = new mongoose.Schema({
    title:{
        type:String,

        required:true
    },
    description:{
        type:String,
    },
    user:{
        type:String,
        required:true
    },
    image:{
        data: Buffer,
        contentType: String
    }
})

module.exports.User = mongoose.model('blogs',BlogSchema);