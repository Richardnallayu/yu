const connection = require('./connection')
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const dotenv = require('dotenv').config();

var app = express();

app.use(bodyParser.json())

var mysqlConnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})
mysqlConnection.connect((err)=>{
    if(err){
        console.log('error'+JSON.stringify(err,undefined,2));
    }else{
        console.log('connected')
    }
})
module.exports=mysqlConnection

//get all data
app.get('/yudb',(req,res)=>{
    connection.query('select * from tbl_yustudent',(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.send(rows)
        }
    })
})
//get specific data
app.get('/studentdb/:id',(req,res)=>{
    connection.query('select * from tbl_student where id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.send(rows)
        }
    })
})
//add data
app.post('/yudb',(req,res)=>{
    var student = req.body
    var studentInfo = [student.name,student.major]

    connection.query('insert into tbl_yustudent (name,major) values(?)',[studentInfo],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.send(rows)
            console.log('student added successfully')
        }
    })
})
//update data
app.put('/students',(req,res)=>{
    var student = req.body

    connection.query('update tbl_yustudent set ? where id='+student.id,[student],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.send(rows)
            console.log('student updated')
        }
    })
})
//delete data
app.delete('/yudb/:id',(req,res)=>{
    connection.query('delete from tbl_yustudent where id=?',[req.params.id],(err,rows)=>{
        if(err){
            console.log(err)
        }else{
            console.log(rows)
            res.send(rows)
            console.log('student deleted')
        }
    })
})
app.listen(3000,()=>console.log('Listening on port 3000'))