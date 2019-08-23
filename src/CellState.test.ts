import { isAlive, alive, dead } from './CellState';

describe('game of life', () => {
  it('Any live cell with fewer than two live neighbours dies, as if by underpopulation', () => {
    expect(isAlive(alive, 0)).toBeFalsy();
    expect(isAlive(alive, 1)).toBeFalsy();
  });

  it('Any live cell with two or three live neighbours lives on to the next generation.', () => {
    expect(isAlive(alive, 2)).toBeTruthy();
    expect(isAlive(alive, 3)).toBeTruthy();
  })

  it('Any live cell with more than three live neighbours dies, as if by overpopulation.', () => {
    expect(isAlive(alive, 4)).toBeFalsy();
    expect(isAlive(alive, 5)).toBeFalsy();
    expect(isAlive(alive, 6)).toBeFalsy();
    expect(isAlive(alive, 7)).toBeFalsy();
    expect(isAlive(alive, 8)).toBeFalsy();
  })

  it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.', () => {
    expect(isAlive(dead, 3)).toBeTruthy();
  })

  it('Any dead cell stays dead expect for three live neighbours ', () => {
    Array.from(Array(9).keys()).filter(x => x != 3).forEach(x => {
      expect(isAlive(dead, x)).toBeFalsy();
    })
  })

});
