const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser')
const mysql = require('mysql');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'socka'
});



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('/user',function(req,res){
  var name=req.body.name;

  let query = "INSERT INTO `TestUser` (name) VALUES ('" +name+ "')";
                         db.query(query, (err, result) => {
                             if (err) {
                                 return res.status(500).send(err);
                             }

                         });


  res.sendStatus(200);

});

router.get('/user',function(req,res){

  user_list = {}
  let query = "select * from TestUser";
  db.query(query, (err, result) => {
        if (err) {
                  return res.status(500).send(err);
              }

      result.forEach (user => {
        user_list[user.idTestUser]  =   user.name
      })
    res.status(200).json(JSON.stringify(user_list));
  });


});







//add the router
app.use(express.static(__dirname + '/View'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.

app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');
