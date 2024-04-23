import * as chai from 'chai';
import * as ternurin from '../src/modulo.js';

describe('pruebas para saber si el ternurin están dentro de la lista', () => {
    it('si lo está', () => {
        chai.assert.ok(ternurin.ternurines.includes('Avril Husky'));
    });
    it('si lo está', () => {
        chai.assert.ok(ternurin.ternurines.includes('Lona Dale'));
    });
    it('si lo está', () => {
        chai.assert.ok(ternurin.ternurines.includes('Lyra Persian'));
    });
})