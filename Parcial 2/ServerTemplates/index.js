const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

app.get('/', (req, res) => {
    // res.send('Servidor Express constestando a GET');
    res.render('index.pug', {nombre:"nayara", apellido:"calderon"});
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});