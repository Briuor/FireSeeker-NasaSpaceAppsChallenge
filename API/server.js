const express = require('express')
const mysql = require('mysql')
const md5 = require('md5')
const cors = require('cors')
const spawn = require('child_process').spawn

const app = express();         
const port = 4000;

const router = express.Router();
app.use(express.json())
app.use(cors())
app.use('/', router);

//Operações do Banco de Dados:
function execSQLQuery(sqlQry, res) {
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'fireseeker'
    });
   
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
          res.json(error);
        else
          res.json(results);
        connection.end();
    });
}

//Definindo as rotas
router.get('/', (req, res) => res.json({ message: 'API Online' })); //Indicate API status

router.get('/users', (req, res) => { //All users query
    execSQLQuery('SELECT * FROM users', res);
})

router.get('/users/:email?', (req, res) => { //Get user info by email
    let filter = ''
    if(req.params.email) filter = `WHERE email = '${req.params.email}'`
    execSQLQuery('SELECT * FROM users ' + filter, res);
})

router.get('/firespots/:state?', (req, res) => { //Get firespots by state
    let filter = ''
    if(req.params.state) filter = `WHERE state like '%${req.params.state}'`
    execSQLQuery('SELECT * FROM fire_spots ' + filter, res);
})

router.get('/firespots/', (req, res) => { //Get firespots by state
    execSQLQuery('SELECT * FROM fire_spots');
})

router.post('/addrequest', (req, res) => { //Add a new request
    const description = req.body.description
    const atuation = req.body.atuation
    const state = req.body.state
    const qnt = req.body.nro_needed
    execSQLQuery(`INSERT INTO requests(description,atuation,state,nro_needed) VALUES ('${description}','${atuation}','${state}','${qnt}')`,res);
});

router.post('/addrequest', (req, res) => { //Add a new request
    
});

router.post('/addcoordinates', (req, res) => { //Populate database with Fire Spots
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'fireseeker'
    });
    let spots = req.body.spots
    spots.forEach(function (spot) {
        lat = spot.latitude
        lon = spot.longitude
        add = spot.address
        city = spot.city
        st = spot.state
        conf = spot.confidence
        const sqlQry = `INSERT INTO fire_spots (latitude,longitude,address,city,state,confidence) VALUES ("${lat}","${lon}","${add}","${city}","${st}","${conf}")`
        connection.query(sqlQry, function(error, results, fields) {
            if(error) //Query error
                //res.json({"valid":false,"error":error})
                console.log(error)
        });
    });
    res.json({"valid":true})
    connection.end();
});

router.post('/adduser', async (req, res) => { //Add a new user
    const name = req.body.name
    const email = req.body.email
    const password = md5(req.body.password)
    const ie = req.body.is_entity
    const org = req.body.organization
    const cc = req.body.company_code
    const at = req.body.atuation
    const st = req.body.state
    execSQLQuery(`INSERT INTO users(name, email, password, state, is_entity, organization, company_code, atuation) VALUES('${name}','${email}','${password}','${st}','${ie}','${org}','${cc}','${at}')`, res); 
});

router.post('/autenticate', (req,res) => { //Autenticates an user
    const email = req.body.email
    const password = req.body.password
    let password_hash = md5(password)
    const sqlQry = `SELECT password,is_entity,state FROM users WHERE email = '${email}'`

    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'fireseeker'
    });
   
    connection.query(sqlQry, function(error, results, fields) {
        if(error) //Query error
            res.json({"valid":false,"error":error})
        else {
          if (results[0] == undefined || results[0] === undefined) { //User don't exist
            res.json({"valid":false,"error":"User don't exist"})
          }
          else { //User exists
            if (results[0].password === password_hash) { //Right password
              res.json({"valid":true,"is_entity":results[0].is_entity,"state":results[0].state,"id":results[0]})
            } else { //Wrong password
                res.json({"valid":false,"error":"Wrong password"})
            }
          } 
        }
        connection.end();
    });
});
     
app.listen(port)