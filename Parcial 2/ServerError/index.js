const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

app.get('/mascotas', (req, res, next) => {
    try {
        throw new Error('aqui provocando el error');
    } catch (e) {
        next(e);
    }
});

app.get('/duenos', (req, res) => {
    if(tru){
        res.send('Servidor Express constestando a GET en ruta dueños');
    } else {
        res.send('Servidor Express no contesta a GET en ruta dueños');
    }
});

app.use((req, res, next) => {
    res.status(404).send('Recurso no encontrado');
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});

// app.use((err, req, res, next)=>{
//     console.log(err);
//     res.status(500).json({
//         error:err.message,
//        })
//     })

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});