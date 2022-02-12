const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
  title:{type:String,required:[true,`Please provide a title for this post`]},
  content:{type:String,required:false},
  createdAt:{type:Date,default:Date.now()},
  image:{type:mongoose.Schema.Types.ObjectId,required:false,unique:false},
  userId:{type:mongoose.Schema.Types.ObjectId,required:false,unique:false},
  public:{type:Boolean,default:false,unique:false},
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post