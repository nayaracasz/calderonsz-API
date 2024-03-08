const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const app = express();

app.use(basicAuth({
    users: { 'admin': 'supersecret' }
}))

app.get('/', (req, res) => {
    res.send('Servidor Express constestando a GET');
});

// envia una peticion a la ruta y responde con los archivos en /public
app.use('/public', express.static(
    path.join(__dirname, '/public')
    ));

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});