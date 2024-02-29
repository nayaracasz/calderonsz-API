const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());
// Create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'SylvanianFamilies',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });


// consultar tabla (con o sin parametros)
app.get('/characters/:CharacterID?', (req, res, next) => {
    try{
        const characterID = req.params.CharacterID;
        let sql = `SELECT * FROM Characters`;
        let params = [];
    
        if(characterID){
            sql += ` WHERE CharacterID = ?`;
            params.push(characterID);
        }
        pool.execute(
            sql, params,
            function(err, results, fields) {``
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
                if(err){
                    res.status(404).json({ error: 'Datos no encontrados' });
                    return;
                } else {
                    res.send(results);
                }
            });
    } catch (err) {
        res.status(500).send(err.code+' / ' + err.message);
    }
});

app.post('/characters', (req, res, next) => {
    try {
        const {name, family, role, description, image} = req.body;
        let params = [name, family, role, description, image];
        let sql = `INSERT INTO Characters (CharacterName, FamilyName, Role, Description, Image) values (?, ?, ?, ?, ?)`;
        if(!name || !family || !role || !description || !image){
            res.status(400).send('Se pide ingresar todos los datos para agregar un nuevo personaje');
            return;
        }
        pool.execute(sql, params, function(err, results, fields){
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            if(err){
                res.status(500).json({ error: 'No es posible agregar el personaje' });
                return;
            } else {
                res.send('Nuevo personaje agregado correctamente');
            }
        });
    } catch (err) {
        res.status(500).send(err.code+' / ' + err.message);
    }
})

app.put('/characters/:CharacterID?', (req, res, next) => {
    const characterID = req.query.CharacterID;
    let sql = 'UPDATE Characters SET ? WHERE CharacterID = ?';
    const nuevosDatos = req.body;

    if(!nuevosDatos || Object.keys(nuevosDatos).length === 0){
        console.log(req.body);
        res.status(400).send('Se pide al menos un campo para modificar un personaje');
        return;
    }
    pool.query(sql, [nuevosDatos, characterID], function(err, results, fields){
        if(err){
            res.status(500).json({ error: 'No es posible modificar el personaje' });
            return;
        } else {
            res.send(`Personaje ${characterID} modificado correctamente`);
        }
    })
})

app.delete('/characters/:CharacterID?', (req, res, next) => {
    try {
        const characterID = req.params.CharacterID;
        let sql = `DELETE FROM Characters WHERE CharacterID = ${characterID}`;
        if(!characterID) { 
            res.status(400).send('Se debe colocar un ID para eliminar un personaje.');
            return;
        }
        pool.execute(sql, function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            if(err) {
                res.status(500).json({ error: 'Error al eliminar el personaje' });
                return;
            } else {
                res.send('Registro ${characterID} eliminado correctamente');
            }
        });
    } catch (err) {
        res.status(500).send(err.code+' / ' + err.message);
    }
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});