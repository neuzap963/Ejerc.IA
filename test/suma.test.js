import {suma, resta} from '../src/services/suma.service.js';

test('adds 1 + 2 to equal 3', () => {
    expect(suma(1, 2)).toBe(3);
});

test('adds 2-1 to equal 1', () => {
    expect(resta(2, 1)).toBe(1);
});