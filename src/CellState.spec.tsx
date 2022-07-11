import { describe, expect, it } from 'vitest'
import nextState from './CellState'

describe('Cell State rules', () => {

    it('Any live cell with fewer than two live neighbours dies, as if by underpopulation', async () => { 
        expect(nextState('alive', 0)).toBe('dead');
        expect(nextState('alive', 1)).toBe('dead');
     });

     it('Any live cell with two or three live neighbours lives on to the next generation', async () => { 
         expect(nextState('alive', 2)).toBe('alive');
         expect(nextState('alive', 3)).toBe('alive');
      });

      it('Any live cell with more than three live neighbours dies, as if by overpopulation',async () => {
        expect(nextState('alive', 4)).toBe('dead');
        expect(nextState('alive', 8)).toBe('dead');
      });

      it('Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction',async () => {
        expect(nextState('dead', 3)).toBe('alive');
      });

      it('Any dead cell without exactly three live neighbours stays dead',async () => {
        [...Array(8).keys()].filter((n) => n != 3).forEach((n) => {
            expect(nextState('dead', n)).toBe('dead');
        });
      });

  });
  