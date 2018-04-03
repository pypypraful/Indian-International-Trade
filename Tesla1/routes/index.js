var express = require('express');
var router = express.Router();
var blog = require('../models/blog');
//Get Homepage
//router.get('/',function(req,res){
//  res.render('index');
//});

router.get('/', function(req,res){
  blog.find({
    valid: true
  }).then((blogs) => {
    //console.log("Trending Blog", blogs);
    //res.send(blogs);
    res.render('index',{
      blogs:blogs
    });
  },(error) => {
   if(error) throw error;
 });
});


module.exports = router;
