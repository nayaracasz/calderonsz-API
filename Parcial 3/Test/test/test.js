import assert from 'node:assert';
import test from 'node:test';
import * as ternurin from '../src/modulo.js';

test('debe se regresar un ternurin dentro de la lista', () => {
    let resultado = ternurin.randomTernurin();
    assert.ok(ternurin.ternurines.includes(resultado));
});