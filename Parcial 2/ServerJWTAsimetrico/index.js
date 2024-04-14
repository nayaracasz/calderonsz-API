const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());
const publica = fs.readFileSync(path.join(__dirname, '/llaves/publica.pem'), 'utf8');
const privada = fs.readFileSync(path.join(__dirname ,'/llaves/privada.pem'), 'utf8');

app.get('/users', validarToken, (req, res) => {
    res.send('Contestando a get desde Server Express');
});

app.post('/login', (req, res, next) => {
    let token = jwt.sign(req.body, privada, {algorithm: 'RS256'});
    res.json({token: token});
})

function validarToken(req, res, next) {
    jwt.verify(req.headers.authorization, publica, function(err, decoded) {
        if(err) {
            res.json({error: "token invalido"});
        } else {
            next();
        }
      });
}

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});