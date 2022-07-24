import { describe, expect, it } from "vitest";
import GameOfLife from "./GameOfLife";
import Position from "./Position";

describe("suite", () => {
  let gameOfLife: GameOfLife;

  beforeEach(async () => {
    gameOfLife = GameOfLife.of(3);
  });

  it("should create an empty grid", async () => {
    expect(gameOfLife.isAliveAt(new Position(0, 0))).toBeFalsy();
  });

  it("should make alive a cell", async () => {
    const pos = new Position(1, 1);
    gameOfLife = gameOfLife.makeAliveCellAt(pos);
    expect(gameOfLife.isAliveAt(pos)).toBeTruthy();
  });

  const removeWhitespace = (grid: string): string => grid.replaceAll(" ", "");

  it("should print grid", async () => {
    gameOfLife = gameOfLife.makeAliveCellAt(new Position(1, 1));
    expect(gameOfLife.toString()).toBe(
      removeWhitespace(
        `___
                 _X_
                 ___`
      )
    );
  });

  it("should have still lifes pattern", async () => {
    gameOfLife = gameOfLife
      .makeAliveCellAt(new Position(0, 0))
      .makeAliveCellAt(new Position(1, 0))
      .makeAliveCellAt(new Position(0, 1))
      .makeAliveCellAt(new Position(1, 1));
    const next = gameOfLife.nextGeneration();
    expect(next.isAliveAt(new Position(0, 0))).toBeTruthy();
    expect(next.isAliveAt(new Position(1, 0))).toBeTruthy();
    expect(next.isAliveAt(new Position(0, 1))).toBeTruthy();
    expect(next.isAliveAt(new Position(1, 1))).toBeTruthy();
  });

  it("should have oscillators pattern", async () => {
    gameOfLife = gameOfLife
      .makeAliveCellAt(new Position(1, 0))
      .makeAliveCellAt(new Position(1, 1))
      .makeAliveCellAt(new Position(1, 2));
    const next = gameOfLife.nextGeneration();
    expect(next.isAliveAt(new Position(0, 1))).toBeTruthy();
    expect(next.isAliveAt(new Position(1, 1))).toBeTruthy();
    expect(next.isAliveAt(new Position(2, 1))).toBeTruthy();
  });

  it("should create a grid with random alive cells", async () => {
    const randomGameOfLife = GameOfLife.of(10, true);
    let aliveCells = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (randomGameOfLife.isAliveAt(new Position(i, j))) {
          aliveCells += 1;
        }
      }
    }
    expect(aliveCells).toBeGreaterThan(0);
  });
});
