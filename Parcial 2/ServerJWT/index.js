const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

app.get('/users', validarToken, (req, res) => {
    res.send('Contestando a get desde Server Express');
});

app.post('/login', (req, res, next) => {
    let token = jwt.sign(req.body, 'shhhhh');
    res.json({token: token});
})

function validarToken(req, res, next) {
    // console.log(req.headers.authorization);
    jwt.verify(req.headers.authorization, 'shhhhh', function(err, decoded) {
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