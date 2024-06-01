const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'SylvanianFamilies',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

router.get('/characters/:CharacterID?', (req, res, next) => {
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
            function(err, results, fields) {
                console.log(results);
                console.log(fields);
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

router.post('/characters', (req, res, next) => {
    try {
        const {name, family, role, description, image} = req.body;
        let params = [name, family, role, description, image];
        let sql = `INSERT INTO Characters (CharacterName, FamilyName, Role, Description, Image) values (?, ?, ?, ?, ?)`;
        if(!name || !family || !role || !description || !image){
            res.status(400).send('Se pide ingresar todos los datos para agregar un nuevo personaje');
            return;
        }
        pool.execute(sql, params, function(err, results, fields){
            console.log(results);
            console.log(fields);
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

router.put('/characters/:CharacterID?', (req, res, next) => {
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

router.delete('/characters/:CharacterID?', (req, res, next) => {
    try {
        const characterID = req.params.CharacterID;
        let sql = `DELETE FROM Characters WHERE CharacterID = ${characterID}`;
        if(!characterID) { 
            res.status(400).send('Se debe colocar un ID para eliminar un personaje.');
            return;
        }
        pool.execute(sql, function(err, results, fields) {
            console.log(results);
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

module.exports = router;