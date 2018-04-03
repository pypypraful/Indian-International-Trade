var express = require('express');
var router = express.Router();
var blog = require('../models/blog');

router.get('/' ,function(req, res){
    blog.find({
      valid: false
    }).then((blogs) => {
      console.log("Unapproved Blogs", blogs);
      res.render('admin', {
          blogsToVerify:blogs
      });
    },(error) => {
     if(error) throw error;
   });

 });

 
 module.exports = router;
