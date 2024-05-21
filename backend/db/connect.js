const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/blog').then(()=>console.log("connected to db")).catch((e)=>console.log(e))
module.exports = mongoose