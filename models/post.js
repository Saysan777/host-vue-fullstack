const mongoose = require('mongoose');

//creating a schema 
const postSchema = mongoose.Schema({
    title: String,
    category: String,
    typeIs: String,
    content: String,
    image: String,
    createdAt:{
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("post", postSchema) //new collection posts will be created as it add the 's' at last itself with the above created schema 