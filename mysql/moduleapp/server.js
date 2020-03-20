const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser')
const db = require('./config');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

router.post('/user', function(request, response){
  console.log('in post method');

let inset_query  = "insert into User_name (name) values ('name_placeholder_value')".replace('name_placeholder_value',request.body.name )

db.query(inset_query , (error, result)=>{
   if (error) {
     console.log(error);
     return response.sendStatus(500).send(error);
   }
}
);
});
router.get('/user', function(request, response){
  console.log('in user get method');

  let select_query  = "select id, name from  User_name";

  user_list ={}
  db.query(select_query , (error, result)=>{
    if (error) {

       response.sendStatus(500).send(error);
    }
    result.forEach (record => {
      user_list[record.id]  =   record.name
    })
     response.json(user_list);
  });

});


router.get('/user/:id', function(request, response){
  var id = request.params.id;
  console.log('in user get method' + id);




  let select_query  = "select id, name from  User_name where id = " + id;

  user_list ={}
  db.query(select_query , (error, result)=>{
    if (error) {

       response.sendStatus(500 );
    }
    result.forEach (record => {
      user_list['id'] = record.id
      user_list['name']  =   record.name
    })

    response.render('person', {person: user_list, error: null});
     
  });

});


app.use(express.static(__dirname + '/Script'));
//Store all JS and CSS in Scripts folder.
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('Running at Port 3000');
