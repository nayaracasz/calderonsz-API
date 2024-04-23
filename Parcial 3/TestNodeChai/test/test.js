import * as chai from 'chai';
import test from 'node:test';
import * as ternurin from '../src/modulo.js';

test('el ternurin está dentro de la lista', () => {
    let resultado = 'Avril Husky';
    chai.assert.isOk(ternurin.ternurines.includes(resultado));
});