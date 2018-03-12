
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express ();


app.get('/api',function(req,res){
     res.send({"message":"welcome to api calls"});
})

app.post('/api/post',verifytoken,function(req,res){

    jwt.verify(req.token, 'shhhh',(err,authdata)=>{
        if(authdata.username != "vinod"){
            console.log("authentication failed");
           res.sendStatus(403);
        }else{
            console.log("authentication success");
            res.json({"message":"post success",authdata});
        }
    })
})

app.post('/login', (req,res)=>{
    // mock user
  const user = {
      id:1,
      username:"vinod",
      admin:true
  }
    jwt.sign(user,'shhhh',(err,token)=>{
       res.json({token:token});
    });
});

function verifytoken (req,res,next) {
  console.log("triggred the function");
    var userheader = req.headers['authorization'];
    console.log("===============================");
    console.log(userheader);
    if(typeof userheader !== 'undefined'){
       const userT = userheader.split(' ');
       const usersplitToken = userT[1];
       req.token = usersplitToken;
        next();
    }else{
        console.log("triggred the function else part"); 
        res.sendStatus(403);
    }

}

app.listen(8000, () => console.log("server running on 8000"));