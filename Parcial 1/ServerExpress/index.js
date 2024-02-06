const express = require('express');
const morgan = require('morgan');
const app = express();

//middleware: funcion que se ejecuta en el ciclo de solicitud de respuesta

//middleware creado de 0
app.use((req, res, next)=>{
    console.log("Peticion al server " + new Date());
    next();
})

//middleware instalado de un npm
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Contestando a get desde Server Express');
});

app.post('/', (req, res) => {
    res.send('Contestando a post desde Server Express')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});