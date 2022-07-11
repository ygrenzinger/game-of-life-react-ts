import { describe, expect, it } from 'vitest'
import { GameOfLife, Position }  from './GameOfLife'

describe('suite', () => {

    it('should create an empty grid', async () => { 
        const gameOfLife = new GameOfLife(1);
        expect(gameOfLife.isAliveAt(new Position(0,0))).toBeFalsy();
     });

     it('should make alive a cell', async () => { 
         const gameOfLife = new GameOfLife(3);
         const pos = new Position(1,1);
         gameOfLife.makeAliveCellAt(pos);
         expect(gameOfLife.isAliveAt(pos)).toBeTruthy();
      });

      const removeWhitespace = (grid: string): string => {
        return grid.replaceAll(' ', '');
      }

     it('should print grid', async () => { 
        const gameOfLife = new GameOfLife(3);
        gameOfLife.makeAliveCellAt(new Position(1,1));
        expect(gameOfLife.toString())
            .toBe(removeWhitespace(
                `___
                 _X_
                 ___`
            ));
     });

     it('should have still lifes pattern', async () => { 
        const gameOfLife = new GameOfLife(2);
        gameOfLife.makeAliveCellAt(new Position(0,0));
        gameOfLife.makeAliveCellAt(new Position(1,0));
        gameOfLife.makeAliveCellAt(new Position(0,1));
        gameOfLife.makeAliveCellAt(new Position(1,1));
        const next = gameOfLife.nextGeneration();
        expect(next.isAliveAt(new Position(0,0))).toBeTruthy();
        expect(next.isAliveAt(new Position(1,0))).toBeTruthy();
        expect(next.isAliveAt(new Position(0,1))).toBeTruthy();
        expect(next.isAliveAt(new Position(1,1))).toBeTruthy();
     }); 

     it('should have oscillators pattern', async () => { 
        const gameOfLife = new GameOfLife(3);
        gameOfLife.makeAliveCellAt(new Position(1,0));
        gameOfLife.makeAliveCellAt(new Position(1,1));
        gameOfLife.makeAliveCellAt(new Position(1,2));
        const next = gameOfLife.nextGeneration();
        expect(next.isAliveAt(new Position(0,1))).toBeTruthy();
        expect(next.isAliveAt(new Position(1,1))).toBeTruthy();
        expect(next.isAliveAt(new Position(2,1))).toBeTruthy();
     }); 
  });
