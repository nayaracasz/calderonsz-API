const yaml = require('yaml');
const fs = require('fs');
const path = require('path');

// convertir objeto yaml a json
const objeto = fs.readFileSync(path.join(__dirname, 'objeto.yaml'), 'utf8');
const varObjeto = yaml.parse(objeto);

console.log(varObjeto);

// convertir arreglo yaml a json
const arreglo = fs.readFileSync(path.join(__dirname, 'arreglo.yaml'), 'utf8');
const varArreglo = yaml.parse(arreglo);

console.log(varArreglo);