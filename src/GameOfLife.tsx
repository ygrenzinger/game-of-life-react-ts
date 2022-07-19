import { Eq } from "fp-ts/lib/Eq";
import { insert, elem, chain } from "fp-ts/Set";
import { pipe } from "fp-ts/function";
import { CellState, computeNextState } from "./CellState";

export class Position {
  readonly rowIndex: number;
  readonly columnIndex: number;
  constructor(rowIndex: number, columnIndex: number) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
  }
}

const eqPoint: Eq<Position> = {
  equals: (p1, p2) =>
    p1.rowIndex === p2.rowIndex && p1.columnIndex === p2.columnIndex,
};

export class GameOfLife {
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

  private aliveCells: Set<Position>;
  private size: number;

  constructor(size: number, aliveCells: Set<Position>) {
    this.size = size;
    this.aliveCells = aliveCells;
  }

  static of(size: number): GameOfLife {
    return new GameOfLife(size, new Set<Position>());
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

  nextGeneration(): GameOfLife {
    let next = GameOfLife.of(this.size);
    const posToEvaluate = this.aliveCellWithNeighbours();
    for (const pos of posToEvaluate) {
      const numbersOfAliveNeighbours = this.numbersOfAliveNeighbours(pos);
      const cellState = this.cellStateAt(pos);
      const nextState = computeNextState(cellState, numbersOfAliveNeighbours);
      if (nextState == "alive") {
        next = next.makeAliveCellAt(pos);
      }
    }
    return next;
  }

  toString = (): string => {
    return Array.from(Array(this.size).keys())
      .map((rowIndex) => this.printLine(rowIndex))
      .join("\n");
  };

  private isInsideGrid(position: Position) {
    return (
      0 <= position.rowIndex &&
      position.rowIndex < this.size &&
      0 <= position.columnIndex &&
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
        } else {
          return "_";
        }
      })
      .join("");
  }
}
