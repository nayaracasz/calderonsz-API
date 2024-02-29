const express = require('express');
import mysql from 'mysql2/promise';
const app = express();

// Create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'northwind',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });

app.use(express.json());
app.use(express.text());

app.get("/employees", async (req, res, next) => {
    let sql = "SELECT * FROM Employees";
    if (typeof req.query.EmployeeID != "undefined"){
        sql = sql + ' where EmployeeID = ${req.query.EmployeeID}';
    }

    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'northwind',
          });
        var [rows, fields] = await connection.query(sql);
        connection.end();

        (rows.length > 0) ? res.send(rows) : res.status(404).json({ error: 'Datos no encontrados' });
    } catch (err) {
        res.status(500).send(err.code+' / ' + err.message);
    }
})


app.post('/employees', async (req, res, next) => {
    res.send('Contestando a post desde Server Express')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});