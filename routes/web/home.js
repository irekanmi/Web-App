const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../../models/user');
const {ensureAuthenticated} = require('../../auth/auth')

router.get("/", async function (req, res) {
  res.render('home/index');
});

router.get('/home',function(req,res){
  res.render('home/home')
});

router.get('/about',function(req,res){
  res.render("home/about")
})


router.get("/login",function(req,res){
  res.render('home/login')
})

router.get('/signup',function(req,res){
  res.render('home/signup')
})

router.get('/logout',function(req,res){
  req.logout();
  res.redirect('/home')
})

router.post('/login',passport.authenticate('login',{
  successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true}))

router.post('/signup',function(req,res,next){
  const { username,email,password } = req.body;

  User.findOne({email},function(err,user){
    if(err){ return next(err)}
    if(user){
      req.flash('error',`There is already an account with these email`);
      res.redirect('/signup')
    }

    const newUser = new User({
      email,
      password,
      username
    })
    newUser.save(next)
  })
},passport.authenticate('login',{
  successRedirect:'/',
  failureRedirect:'/signup',
  failureFlash:true
})
)

module.exports = router