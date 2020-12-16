const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const Db = require('./db');
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

//create


//read
app.get('/wards',(req,res)=>{
    const db = Db.getDbInstance();
    const result = db.getAllWards();
    result
    .then(data => res.json({data: data}))
    .catch(err=>console.log(err));

})
app.get('/',(req,res)=>{
    try{
        res.json({
        ok:true
        })
    }catch(err){
        console.log(err);
    }
})

//update


//delete


app.listen(process.env.PORT,()=> console.log("app is running"));
