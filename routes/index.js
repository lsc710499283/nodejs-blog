var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/boke";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '李思辰的个人空间',user:req.session.user });
});
router.get('/photo', function(req, res, next) {
  res.render('photo', {title: '李思辰的个人相册',user:req.session.user});
});
router.get('/liuyan',function(req,res,next){
	
mongodb.connect(db_str,function(err,db){
	if(err){}
	else{
		db.collection('liuyan').find().toArray(function(err,ress){
if(err){}
else{
	res.render('liuyan',{title:'李思辰的留言板',user:req.session.user,ress:ress})
		//res.render('liuyan',{ress:ress})
}
			})
		}
	})

})
router.get('/about', function(req, res, next) {
  res.render('about', {title: '李思辰的个人空间',user:req.session.user});
});
router.get('/zhuce', function(req, res, next) {
  res.render('zhuce', {title: '李思辰的个人空间',user:req.session.user});
});
router.get('/tuichu',function(req,res,next){
	req.session.destroy(function(err){
	if(!err){
			res.redirect('/');
		}
	})
})
router.get('/denglu', function(req, res, next) {
  res.render('denglu', {title: '李思辰的个人空间',user:req.session.user});
});

module.exports = router;
