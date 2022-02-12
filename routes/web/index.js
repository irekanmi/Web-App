const express = require('express');
const router = express.Router();
const { ensureAuthenticated} = require('../../auth/auth');


router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.info = req.flash('info')
  next()
})

router.use('/',require('./home'));
router.use('/posts',ensureAuthenticated,require('./posts'))

module.exports = router