const express = require('express');
const morgan = require('morgan');
const app = express();

//middleware: funcion que se ejecuta en el ciclo de solicitud de respuesta

//middleware creado de 0
// app.use((req, res, next)=>{
//     console.log("Peticion al server " + new Date());
//     next();
// })

//middleware instalado de un npm
app.use(morgan('tiny'));
//middleware para usar el json del body de la peticion
app.use(express.json());
//middleware para usar el texto del cuerpo de la peticion
app.use(express.text());
// middleware para accesar al formulario (form-encode)
app.use(express.urlencoded({ extended : false }));

// parametros de consulta
app.get('/alumnos', (req, res, next) => {
    console.log(req.query);
    res.send('Contestando a get desde Server Express');
});

// parametros en la ruta
app.get('/maestros/:carrera', (req, res, next) => {
    console.log(req.params.carrera);
    res.send('Contestando a get desde Server Express')
})

// parametros en el cuerpo de la peticion
app.get('/administrativos', (req, res, next) => {
    // para saber que parametros contiene el body
    for (const campo in req.body) {
        console.log(req.body[campo]);
    }
    res.send('Contestando a get desde Server Express')
})
// recibir formulario
app.get('/prefectos', (req, res, next) => {
    console.log(req.body);
    res.send('Contestando a get desde Server Express')
})


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});