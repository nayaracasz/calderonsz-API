const ternurin = require('../src/modulo.js');

ternurin.randomTernurin = jest.fn( () => { return 'Avril Husky' } )

test('el ternurin está dentro de la lista', () => {
    let ternurinAleatorio = ternurin.randomTernurin();
    expect(ternurinAleatorio).toBe('Avril Husky');
});