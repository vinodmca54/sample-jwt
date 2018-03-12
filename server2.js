const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res)=>{
    res.send({message:"api call success"});
});

app.post('/api/post',verifytoken,(req,res)=>{

    jwt.verify(req.token,'shhhh',(err,authdata)=>{
       if(authdata.username != "vinod"){
           res.sendStatus(403);
       }else{
        res.json({"message":"post created....",authdata});
       }
    })
});

app.post('/login',(req,res)=>{
   const user = {
       id:2,
       uname:"vinod",
       admin:false
   }
   jwt.sign(user,'shhhh',(err,token) =>{
      res.json({token:token});
   })
})

function verifytoken(req,res,next){
    const userheader = req.headers['authorization'];
    if(typeof userheader !== 'undefind'){
        const userT = userheader.split(' ');
        const usertoken = userT[1];
        req.token = usertoken;
         next();
    }else{
        res.sendStatus(403);
    }

}

app.listen(8000,()=>{
    console.log("server running on 8000");
});