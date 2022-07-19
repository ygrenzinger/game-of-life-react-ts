import { describe, expect, it } from "vitest";
import { GameOfLife, Position } from "./GameOfLife";

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

  const removeWhitespace = (grid: string): string => {
    return grid.replaceAll(" ", "");
  };

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
});
