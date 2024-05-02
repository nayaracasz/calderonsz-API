const {ternurines} = require('../src/modulo.js');

test('el ternurin está dentro de la lista', () => {
    let resultado = 'Avril Husky';
    expect(ternurines.includes(resultado)).toBe(true);
});