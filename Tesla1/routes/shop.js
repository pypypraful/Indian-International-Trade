var express = require('express');
var router = express.Router();

//Get Shop-Page
router.get('/shop',function(req,res){
  res.render('shop');
});


module.exports = router;
