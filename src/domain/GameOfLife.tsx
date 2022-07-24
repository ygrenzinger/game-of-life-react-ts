import { Eq } from "fp-ts/lib/Eq";
import { insert, elem, chain, remove } from "fp-ts/Set";
import { pipe } from "fp-ts/function";
import { CellState, computeNextState } from "./CellState";
import Position from "./Position";

const eqPoint: Eq<Position> = {
  equals: (p1, p2) =>
    p1.rowIndex === p2.rowIndex && p1.columnIndex === p2.columnIndex,
};

export default class GameOfLife {
  private static neighbourShifts = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  readonly size: number;

  private aliveCells: Set<Position>;

  constructor(size: number, aliveCells: Set<Position>) {
    this.size = size;
    this.aliveCells = aliveCells;
  }

  static of(size: number, random: boolean = false): GameOfLife {
    const aliveCells: Position[] = [];
    if (random) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (Math.floor(Math.random() * 2) % 2 === 1) {
            aliveCells.push(new Position(i, j));
          }
        }
      }
    }
    return new GameOfLife(size, new Set<Position>(aliveCells));
  }

  isAliveAt(position: Position): boolean {
    return elem(eqPoint)(position)(this.aliveCells);
  }

  cellStateAt(position: Position): CellState {
    return this.isAliveAt(position) ? "alive" : "dead";
  }

  makeAliveCellAt(position: Position): GameOfLife {
    const aliveCells = insert(eqPoint)(position)(this.aliveCells);
    return new GameOfLife(this.size, aliveCells);
  }

  makeDeadCellAt(position: Position): GameOfLife {
    const aliveCells = remove(eqPoint)(position)(this.aliveCells);
    return new GameOfLife(this.size, aliveCells);
  }

  switchStateAt(position: Position): GameOfLife {
    if (this.isAliveAt(position)) {
      return this.makeDeadCellAt(position);
    }
    return this.makeAliveCellAt(position);
  }

  nextGeneration(): GameOfLife {
    let next = GameOfLife.of(this.size);
    const posToEvaluate = this.aliveCellWithNeighbours();
    posToEvaluate.forEach((pos) => {
      const numbersOfAliveNeighbours = this.numbersOfAliveNeighbours(pos);
      const cellState = this.cellStateAt(pos);
      const nextState = computeNextState(cellState, numbersOfAliveNeighbours);
      if (nextState === "alive") {
        next = next.makeAliveCellAt(pos);
      }
    });
    return next;
  }

  toString = (): string =>
    Array.from(Array(this.size).keys())
      .map((rowIndex) => this.printLine(rowIndex))
      .join("\n");

  private isInsideGrid(position: Position) {
    return (
      position.rowIndex >= 0 &&
      position.rowIndex < this.size &&
      position.columnIndex >= 0 &&
      position.columnIndex < this.size
    );
  }

  private numbersOfAliveNeighbours(position: Position): number {
    const neighbours = this.neighboursOf(position);
    return neighbours.reduce((acc: number, pos) => {
      if (this.isAliveAt(pos)) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  private neighboursOf(position: Position): Position[] {
    const neighbours = GameOfLife.neighbourShifts
      .map(
        (shift) =>
          new Position(
            position.rowIndex + shift[0],
            position.columnIndex + shift[1]
          )
      )
      .filter((pos) => this.isInsideGrid(pos));
    return neighbours;
  }

  private blockAt(position: Position): Set<Position> {
    const positions = this.neighboursOf(position);
    positions.push(position);
    return new Set(positions);
  }

  private aliveCellWithNeighbours(): Set<Position> {
    return pipe(
      this.aliveCells,
      chain(eqPoint)((pos) => this.blockAt(pos))
    );
  }

  private printLine(rowIndex: number): string {
    return Array.from(Array(this.size).keys())
      .map((colIndex) => {
        if (this.isAliveAt(new Position(rowIndex, colIndex))) {
          return "X";
        }
        return "_";
      })
      .join("");
  }
}
