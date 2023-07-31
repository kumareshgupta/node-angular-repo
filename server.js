const pool = require('./db.js');
const bodyParser = require('body-parser');

var express = require('express');
var app = express();

app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Welcome to Web Application . Enjoying learning..');
})

app.get('/users', (req, res)=>{
    pool.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });   
})

app.get('/users/:id', (req, res)=>{
    pool.query(`Select * from users where id=${req.params.id}`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });

})

app.post('/users', (req, res)=> {
    const user = req.body;
    let insertQuery = `insert into users(name, email, location) 
                       values('${user.name}', '${user.email}', '${user.location}')`

    pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('New record inserted successfully')
        }
        else{ console.log(err.message) }
    })
    
})

app.put('/users/:id', (req, res)=> {
    let user = req.body;
    let updateQuery = `update users
                       set name = '${user.name}',
                       email = '${user.email}',
                       location = '${user.location}'
                       where id = ${req.params.id}`

    pool.query(updateQuery, (err, result)=>{
        if(!err){
            res.send('Record Updated successfully')
        }
        else{ console.log(err.message) }
    })
})

app.delete('/users/:id', (req, res)=> {
    let insertQuery = `delete from users where id=${req.params.id}`

    pool.query(insertQuery, (err, result)=>{
        if(!err){
            res.send('Record deleted successfulyl')
        }
        else{ console.log(err.message) }
    })
})




app.listen(3200, ()=>{
    console.log('Server is listening at port 3200')
})

