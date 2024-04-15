const express = require('express');
const app = express();
const multer = require('multer');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'Archivo subido correctamente!' });
  });

app.listen(3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
``