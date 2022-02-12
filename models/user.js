const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const SALT = 10;

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:[true,`Please provide a username`]
  },
  password:{
    type:String,
    required:false
  },
  email:{
    type:String,
    required:[true,`Please provide a valid email`]
  },
  createdAt:{
    type:Date,
    default:Date.now()
  }
})

userSchema.pre('save',async function(next){
  

  const salt = await bcrypt.genSalt(SALT);
  const hashedPassword = await bcrypt.hash(this.password,salt)

  this.password = hashedPassword;
  next()
})

userSchema.methods.checkPassword = function(guess,done){
  if(this.password != null){
    bcrypt.compare(guess,this.password,function(err,isMatch){
      done(err,isMatch)
    })
  }
}

const User = mongoose.model('User',userSchema);

module.exports = User