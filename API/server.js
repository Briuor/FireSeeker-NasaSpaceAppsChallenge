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

//Database Operations:
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

router.post('/emailbyid/', (req, res) => { //Get email by id
    let filter = ''
    if(req.body.id) filter = `WHERE id = '${req.body.id}'`
    execSQLQuery('SELECT email FROM users ' + filter, res);
})

router.post('/useridbystate/', (req, res) => { //Get user id by state
    let filter = ''
    if(req.body.state) filter = `WHERE state like '%${req.body.state}' and is_entity = 0`
    execSQLQuery('SELECT id FROM users ' + filter, res);
})

router.post('/lastrequestidbystate/', (req, res) => { //Get last request id by state
    let filter = ''
    if(req.body.state) filter = `WHERE state like '%${req.body.state}'`
    execSQLQuery('SELECT id FROM requests ' + filter + ' order by id desc limit 1', res);
})

router.post('/addrequesttouser/', (req, res) => { //Add a request to an user
    const user = req.body.user_id
    const request = req.body.request_id
    execSQLQuery(`INSERT INTO user_requests(user_id,request_id) VALUES ('${user}','${request}')`, res);
})

router.get('/userrequests/:id?', (req, res) => { //Get requests by user id
    let id = req.params.id
    execSQLQuery(`SELECT * FROM user_requests where user_id = '${id}'`, res);
})

router.post('/updatestatus', (req, res) => { //Update the status of a request
    const user = req.body.user_id
    const request = req.body.request_id
    execSQLQuery(`UPDATE user_requests SET status = 1 WHERE user_id = '${user}' and request_id = '${request}'`, res);
})

router.post('/addrequest', (req, res) => { //Add a new request
    const description = req.body.description
    const atuation = req.body.atuation
    const state = req.body.state
    const qnt = req.body.nro_needed
    execSQLQuery(`INSERT INTO requests(description,atuation,state,nro_needed) VALUES ('${description}','${atuation}','${state}','${qnt}')`,res);
    let _state = ''
    for (var i = 0; i < state.lenth; i++) {
        if (state.charAt(i) == ' ') _state += '_'
        else _state += state.charAt(i)
    }
    //console.log(state)
    const pythonProcess = spawn('python',["send_mail.py", _state]);
    pythonProcess.stdout.on('data', function(data) {
        let msg = data.toString()
        //console.log(msg)
    });
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
    const sqlQry = `SELECT password,is_entity,state,id FROM users WHERE email = '${email}'`

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
              res.json({"valid":true,"is_entity":results[0].is_entity,"state":results[0].state,"id":results[0].id})
            } else { //Wrong password
                res.json({"valid":false,"error":"Wrong password"})
            }
          } 
        }
        connection.end();
    });
});
     
app.listen(port)