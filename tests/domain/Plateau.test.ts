import { Plateau } from '../../src/domain/Plateau';

describe('Plateau', () => {
  it('deve retornar true para uma posição válida dentro dos limites', () => {
    const plateau = new Plateau({ x: 5, y: 5 });
    expect(plateau.isValidPosition({ x: 3, y: 3 })).toBe(true);
  });

  it('deve retornar false para uma posição fora dos limites', () => {
    const plateau = new Plateau({ x: 5, y: 5 });
    expect(plateau.isValidPosition({ x: 6, y: 6 })).toBe(false);
  });
});
