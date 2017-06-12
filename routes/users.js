var express = require('express');
var router = express.Router();
var mongodb=require('mongodb').MongoClient;
var db_str="mongodb://localhost:27017/boke";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/form2',function(req,res,next){
//res.send('注册成功')
var zh= req.body['zh'];
var pass=req.body['pass'];

var insertData=function(db,callback){
	var conn=db.collection('zhuce');
	var data=[{zh:zh,pass:pass}];
	conn.insert(data,function(err,result){
		callback(result);
	})
}

mongodb.connect(db_str,function(err,db){
	if(err){}
	else{
		console.log("连接成功");
insertData(db,function(result){
	console.log(result)
	res.redirect('/');
				db.close()
			})			
		}
	})
	
})

router.post('/form1',function(req,res,next){
var zh=req.body['zh'];
var pass=req.body['pass'];
mongodb.connect(db_str,function(err,db){
	if(err){}
	else{
		db.collection('zhuce').find({zh:zh,pass:pass}).toArray(function(err,ress){
if(err){}
else{
			if(ress.length>0){
			req.session.user=zh
			console.log(req.session.user)
					res.redirect('/')
		db.close()
}else{res.send('登录失败')}
				}
			})
		}
	})
})

router.post('/liuyan',function(req,res,next){
if(req.session.user){
	var bt=req.body['bt'];
	console.log(bt);
	console.log(bt.toString())
	var neirong=req.body['neirong'];
	var insertData=function(db,callback){
	var conn=db.collection('liuyan');
	var data=[{bt:bt,neirong:neirong}];
	conn.insert(data,function(err,result){
		callback(result);
	})
}
mongodb.connect(db_str,function(err,db){
	if(err){}
	else{
insertData(db,function(result){
	res.redirect('/liuyan');
				db.close()
			})			
		}
})}else{
	res.send("你不登陆就留言，我怎么知道你是谁？？")
}
})


module.exports = router;
