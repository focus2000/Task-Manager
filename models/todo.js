const mongoose = require('mongoose')


const todoSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },

    title:{
        type:String,
        required:true,
        trim:true
    }
})

module.exports = mongoose.model('todo', todoSchema)