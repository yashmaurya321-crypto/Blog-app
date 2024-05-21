const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken')
const Blog = require('./db/blog_scheme')
const User = require("./db/user_model");
const authenticateToken = require('./db/authication')
const secreat = "yash"
app.use(cors());
app.use(express.json()); 

require('./db/connect');

app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
    
    
  
      const token = jwt.sign({ userId: user._id }, secreat);
      res.json({ token , user});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const newUser = new User({ name, email, password });

        const savedUser = await newUser.save(); 
        res.send(savedUser); 
    } catch (e) {
        res.status(500).send(e); 
    }
}); 

app.post('/blog', async(req,res)=>{
  try{
    const {author, title, content, category, comments} = req.body
const data = new Blog({author, title, content, category, comments} )

const response = await data.save()

const updatedUser = await User.findOneAndUpdate(
  { _id: author },
  { $addToSet: { blogs: response._id } }, 
  { new: true } 
);
res.send(response)
  }catch(err){
    res.send(err)
  }
})
app.put('/update', async(req,res)=>{
  try {
   const {name, email, password} = req.body
   const respon = await User.findOneAndUpdate({email}, {name, email, password})
   res.send(express.response)
  } catch (error) {
    res.send(error)
  }
})
app.put('/follow', async(req,res)=>{
  try {
   const {followerid, reciverid} = req.body
   const data = await User.findById(followerid)
   const data2 = await User.findById(reciverid)
   const updatedUser = await User.findOneAndUpdate(
    { _id: reciverid },
    { $addToSet: { followers: followerid } }, 
    { new: true } 
  );
  
  const updatedUser2 = await User.findOneAndUpdate(
    { _id: followerid },
    { $addToSet: { followings: reciverid } }, 
    { new: true } 
  );
   res.send(updatedUser)
  } catch (error) {
    res.send(error)
  }
})
app.get("/person", async(req,res)=>{
  try{
const data = await User.find()
res.send(data)
  }catch(e){
    res.send(e)
  }
})
app.put('/like', async (req, res) => {
  try {
    const { id } = req.body;
    const blog = await Blog.findOneAndUpdate(
      { _id: id },
      { $inc: { likes: 1 } },
      { new: true } 
    );
    
    res.send(blog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
app.post('/profile', async(req,res)=>{
  try {
    const {id} = req.body
    const data = await User.findById(id)
    res.send(data)
  } catch (error) {
    res.send(error)
  }
})
app.post('/profile_blog',async(req,res)=>{
  try{
    const {authorid} = req.body
const persons = await Blog.find({author : authorid})
res.send(persons)

  }catch(err){
    res.send(err)
  }
})
app.get('/blog',async(req,res)=>{
  try{
const data = await Blog.find().populate('author')
res.send(data)
  }catch(err){
    res.send(err)
  }
})
app.post("/follower", async(req,res)=>{
  try{
    const userIds = req.body.userIds;
    const userDetails = await User.find({ _id: { $in: userIds } });
    res.json(userDetails);
  }catch(err){
    res.send(err)
  }
})
app.put("/comment", async(req,res)=>{
try{
  const {blogid, personid, comment} = req.body
  const user = await User.findById( personid)
  const updatedUser2 = await Blog.findOneAndUpdate(
    { _id: blogid },
    { $addToSet: { comments: {name : user.name, comment : comment} } }, 
    { new: true } 
  );
  res.send(updatedUser2)
}catch(e){
  res.send(e)
}
})
app.get('/', authenticateToken, (req, res) => {
     res.json({ message: 'Access granted' });
   });
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
