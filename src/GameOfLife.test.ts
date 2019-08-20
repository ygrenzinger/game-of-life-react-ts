import { isAlive, alive, dead } from './GameOfLife';

describe('game of life', () => {
  it('Any live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
    expect(isAlive(alive, 0)).toBe(false);
    expect(isAlive(alive, 1)).toBe(false);
  });

  it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
    expect(isAlive(alive, 2)).toBe(true);
    expect(isAlive(alive, 3)).toBe(true);
  })

  it('Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
    expect(isAlive(alive, 4)).toBe(false);
    expect(isAlive(alive, 5)).toBe(false);
    expect(isAlive(alive, 6)).toBe(false);
    expect(isAlive(alive, 7)).toBe(false);
    expect(isAlive(alive, 8)).toBe(false);
  })

  it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
    expect(isAlive(dead, 3)).toBe(true);
  })

  it('Any dead cell stays dead expect for three live neighbours ', () => {
    expect(isAlive(dead, 2)).toBe(false);
  })

});
