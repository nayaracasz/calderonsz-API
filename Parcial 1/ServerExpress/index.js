const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Contestando a get desde Server Express');
});

app.post('/', (req, res) => {
    res.send('Contestando a post desde Server Express')
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});