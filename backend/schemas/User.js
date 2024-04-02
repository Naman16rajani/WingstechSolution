let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    username:{
        type:String,

        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports.User = mongoose.model('users',UserSchema);