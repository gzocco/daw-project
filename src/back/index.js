/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var mysql   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

/*app.get('/devices/', function(req, res, next) {
    response = "{ 'key1':'value1' }"
    res.send(JSON.stringify(response)).status(200);
});
*/
app.get('/devices/', function(req, res, next) {
    //let response = require('./datos.json');     // Obtengo info de devices desde archivo JSON.
    mysql.query('select * from Devices', function(err,resp){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(resp);
    });
    //res.send(JSON.stringify(response)).status(200);     
});


app.post('/devices',function(req,res){
    mysql.query('update Devices set state= ? where id=?',[req.body.state,req.body.id], function (err,resp){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(resp);
    });

    /*    let df =data.filter(item=>item.id==req.body.id);
    if (df.length>0){
        df[0].state=req.body.state;
    }
    res.json(df);*/
    });


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
