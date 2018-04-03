var express = require('express');
var router = express.Router();
var blog = require('../models/blog');


router.get('/ancient/:categoryName' ,function(req, res){
   blog.find({
     valid: true,
     category: req.params.categoryName
   }).then((blogs) => {
     //console.log("Trending Blog", blogs);
     //res.send(blogs);
     res.render('categoryblog',{
       blogs:blogs
     });
   },(error) => {
    if(error) throw error;
  });


});

router.get('/medieval' ,function(req, res){
   blog.find({
     valid: true,
   }).then((blogs) => {
     //console.log("Trending Blog", blogs);
     //res.send(blogs);
     res.render('trending-blog',{
       blogs:blogs
     });
   },(error) => {
    if(error) throw error;
  });
});

router.get('/modern' ,function(req, res){
   blog.find({
     valid: true
   }).then((blogs) => {
     //console.log("Trending Blog", blogs);
     //res.send(blogs);
     res.render('trending-blog',{
       blogs:blogs
     });
   },(error) => {
    if(error) throw error;
  });
});


module.exports = router;
