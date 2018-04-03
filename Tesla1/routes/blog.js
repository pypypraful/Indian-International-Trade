var express = require('express');
var router = express.Router();

var blog = require('../models/blog');

//Add-Blog
router.get('/add-blog',ensureAuthenticated,function(req, res){
  res.render('add-blog');
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error_msg','You have to be logged in first');
    res.redirect('/users/login');
  }
}

//register Blog
router.post('/add-blog',function(req,res){
  var name = req.body.name;
  var title = req.body.title;
  var category  = req.body.category;
  var language = req.body.language;
  var description = req.body.description;
  var blogtext = req.body.blogtext;

  //Validation
  req.checkBody('name','Name is required').notEmpty();
  req.checkBody('title','Title is required').notEmpty();
  req.checkBody('category','Category is not valid').notEmpty();
  req.checkBody('language','Language is required').notEmpty();
  req.checkBody('description','Description is required').notEmpty();
  req.checkBody('blogtext','Blog cannot be Empty').notEmpty();

  var errors = req.validationErrors();

  if(errors){
    res.render('add-blog',{
      errors: errors
    });
  } else{
    var newBlog = new blog({
      name: name,
      title: title,
      category: category,
      language: language,
      description: description,
      blogtext: blogtext,
      valid: false,
      upvote: 0,
      viewed: 0
    });


    newBlog.save().then((savedBlog) => {
      req.flash("success_msg",'Your blog has been submitted');
      res.redirect('/blog/add-blog');
    }, (error) => {
      if(error) throw error;
    })

    //blog.createBlog(newBlog, function(err,user){
    //  if(err) throw err;
    //  //console.log(blog);
    //});

    //req.flash("success_msg",'Your blog has been submitted');

    //res.redirect('/blog/add-blog');
  }
});

router.get('/trending-blog' ,function(req, res){
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

router.get('/blogpage/:idname', function(req,res){
  blog.find({
    _id: req.params.idname
  }).then((blogs) => {
    res.render('blogpage',{
      blogs:blogs
    });
  }, (error)=>{
    if(error) throw error;
  });
});



module.exports = router;
