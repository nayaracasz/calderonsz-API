const express = require('express');
const fs = require('fs');
const path = require('path')
const formidable = require('formidable');
 
const app = express();
 
app.post('/upload', (req, res, next) => {
 
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
 
        let oldPath = files.archivo.filepath;
        console.log(files.archivo);
        let newPath = path.join(__dirname, 'uploads') + '/' + files.archivo.originalFilename;
        let rawData = fs.readFileSync(oldPath);
 
        fs.writeFile(newPath, rawData, function (err) {
            if (err) console.log(err)
            return res.send("Successfully uploaded")
        })
    })
});
 
app.listen(3000, function (err) {
    if (err) console.log(err)
    console.log('Server listening on Port 3000');
});