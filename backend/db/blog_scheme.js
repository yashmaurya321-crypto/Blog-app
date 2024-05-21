const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String },
    category: { type: String },
    comments: Array,
    likes : { type : Number, default : 0}
});

const Blog = mongoose.model("Blogs", BlogSchema)

module.exports = Blog