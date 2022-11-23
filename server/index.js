const express= require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel= require('./models/users');

const cors = require('cors');
app.use(express.json());
app.use(cors());//decides who has access to which data

mongoose.connect("mongodb+srv://collegestudy:7mongo5db5@cluster0.zhzb0x6.mongodb.net/mern1?retryWrites=true&w=majority");
//we are connected to our mongodb database mern1
app.get("/getUsers",(req,res)=>
{
   UserModel.find({},(err,result)=>
   {
    if(err){res.json(err);}
    else{res.json(result);}
   });
});
app.post("/createUser",async(req,res)=>
{
    const user=req.body;//assuming forntend sends body object
    const newUser = new UserModel(user);//to add data to our model
    await newUser.save();//to save info,for this u need async

    res.json(user);
}); 


app.listen(3001,()=>{
    console.log("Server runs");
});