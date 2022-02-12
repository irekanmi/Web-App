const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../../auth/auth');
const Post = require('../../models/post');


router.get('/',function(req,res){
  Post.find({
    userId:req.user._id,
  }).exec(function(err,posts){
    if(err){console.log(err);}
    
    res.render('posts/post',{posts});
  })
})

router.get('/add',function(req,res){
  res.render('posts/addposts')
})

router.post('/add',function(req,res){
  const {title,content} = req.body

  const newPost = new Post({
    title,
    content,
    userId:req.user._id
  })

  newPost.save(function(err,post){
    if(err){console.log(err);}
    res.redirect('/posts')
  })
})

router.get('/:postId',function(req,res){
  Post.findById(req.params.postId).exec(function(err,post){
    if(err){ return console.log(err); }
    res.render('post/singlePost', { post } )
  })
})

module.exports = router