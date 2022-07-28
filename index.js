const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var mysqlConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud_db'
});

mysqlConn.connect((err)=>{
    if(!err){
        console.log('Pass');
    }else{
        console.log('fail');
    }
});

app.post('/api/user', (req, res)=>{
    let query = "";
    mysqlConn.query('INSERT INTO user (name, email) VALUES (?,?)', [req.body.name, req.body.email], (err, results)=>{

        // if(!err){
        //     console.log("Added New User");
        //     // res.send("Added New User");
        // }else{
        //     console.log("Error" + err);
        // }
        // if(err) throw err;
        res.send(apiResponse(results));
    });
});

app.get('/api/users',(req, res) => {
    let sqlQuery = "SELECT * FROM user";
    
    let query = mysqlConn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

app.get('/api/users/:id',(req, res) => {
    let sqlQuery = "SELECT * FROM user WHERE id=" + req.params.id;
      
    let query = mysqlConn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  app.put('/api/users/:id',(req, res) => {
    let sqlQuery = "UPDATE user SET name='"+req.body.name+"', email='"+req.body.email+"' WHERE id="+req.params.id;
    
    let query = mysqlConn.query(sqlQuery, (err, results) => {
      if(err) throw err;
      res.send(apiResponse(results));
    });
  });

  app.delete('/api/users/:id',(req, res) => {
    let sqlQuery = "DELETE FROM user WHERE id="+req.params.id+"";
      
    let query = mysqlConn.query(sqlQuery, (err, results) => {
      if(err) throw err;
        res.send(apiResponse(results));
    });
  });

function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}

app.listen(3000,()=>{
    console.log("Express is runing"); 
});