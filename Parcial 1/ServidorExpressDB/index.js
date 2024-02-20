const express = require('express');
const mysql = require('mysql2');
const app = express();

// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'northwind',
  });

app.use(express.json());

// consultar tabla (con o sin parametros)
app.get('/employees/:EmployeeID?', (req, res) => {
    try{
        const employeeID = req.params.EmployeeID;
        let sql = 'SELECT * FROM Employees';
        let params = [];
    
        if(employeeID){
            sql += ' WHERE EmployeeID = ?';
            params.push(employeeID);
        }
        connection.query(
            sql, params,
            function(err, results, fields) {
                console.log(results); // results contains rows returned by server
                console.log(fields); // fields contains extra meta data about results, if available
                if(results.length > 0){
                    res.send(results);
                } else {
                    res.status(404).json({ error: 'Datos no encontrados' });
                }
            });
    } catch (err) {
        res.send(err.code+' / ' + err.message);
    }
});

app.post('/', (req, res) => {
    res.send('Contestando a post desde Server Express')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});