/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT = 3000;    // Port interno donde escucha la API.

var express = require('express');
var app = express();
var mysql = require('./mysql-connector');

// to parse application/json
app.use(express.json());
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

/*
*   Metodo de API para obtener listado completo de devices.
*/
app.get('/devices/', function (req, res, next) {
    //let response = require('./datos.json');     // Obtengo info de devices desde archivo JSON.
    mysql.query('select * from Devices', function (err, resp) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(resp);
    });
});

/*
*   Metodo de API para obtener device por id.
*/
app.get('/devices/:id', function (req, res, next) {
    mysql.query('select * from Devices where id=?', [req.params.id], function (err, resp) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(resp);
    });
});

/*
*   Metodo de API para actualizar state de un device referenciado por id.
*/
app.post('/devices', function (req, res) {
    mysql.query('update Devices set state= ? where id=?', [req.body.state, req.body.id], function (err, resp) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(resp);
    });
});

/*
*   Metodo de API para crear un nuevo device.
*/
app.post('/devices/create', function (req, res) {
    mysql.query('insert into Devices (name, description, state, type) values (?,?,?,?)', [req.body.name, req.body.description, req.body.state, req.body.type], function (err, resp) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(resp);
    });
});

/*
*   Metodo de API para crear un nuevo device.
*/
app.post('/devices/remove', function (req, res) {
    mysql.query('delete from Devices where id= ?', [req.body.id], function (err, resp) {
        if (err) {
            res.send(err).status(400);
            return;
        }
        res.send(resp);
    });
});


app.listen(PORT, function (req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================