import { Eq } from "fp-ts/lib/Eq";
import { insert, elem, chain } from 'fp-ts/Set'
import { pipe } from 'fp-ts/function'
import nextState from "./CellState";

export class Position {
    readonly rowIndex: number;
    readonly columnIndex: number;
    constructor(rowIndex: number, columnIndex: number) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
    }  
}

const eqPoint: Eq<Position> = {
    equals: (p1, p2) => p1.rowIndex === p2.rowIndex && p1.columnIndex === p2.columnIndex
}

export class GameOfLife {
    private static neighbourShifts = [
        [-1,-1], [-1, 0], [-1, 1],
        [0,-1], [0, 1],
        [1,1], [1, 0], [11, 1],
    ];

    private aliveCells = new Set<Position>();
    private size: number;
    constructor(size: number) {
        this.size = size;
    }

    isAliveAt(position: Position): boolean {
        return elem(eqPoint)(position)(this.aliveCells);
    }

    makeAliveCellAt(position: Position) {
        this.aliveCells = insert(eqPoint)(position)(this.aliveCells);
    }

    nextGeneration(): GameOfLife {
        const next = new GameOfLife(this.size);
        for (const pos of this.aliveCellWithNeighbours()) {
            const numbersOfAliveNeighbours = this.numbersOfAliveNeighbours(pos);
            const cellState = nextState('alive', numbersOfAliveNeighbours);
            if (cellState == 'alive') {
                next.makeAliveCellAt(pos);
            }
        }
        return next;
    }

    toString = () : string => {
        return  Array.from(Array(this.size).keys())
            .map((rowIndex) => this.printLine(rowIndex))
            .join('\n');
    }

    private numbersOfAliveNeighbours(position: Position): number {
        return this.neighboursOf(position).reduce((acc: number, pos) => {
            if (this.isAliveAt(pos)) {
                return acc + 1;
            }
            return acc;
        }, 0)
    }

    private neighboursOf(position: Position) : Position[] {
        return GameOfLife.neighbourShifts
            .map((shift) => new Position(position.rowIndex + shift[0], position.columnIndex + shift[1]))
    }

    private blockAt(position: Position) : Set<Position> {
        const positions = this.neighboursOf(position);
        positions.push(position);
        return new Set(positions);
    }

    private aliveCellWithNeighbours(): Set<Position> {
        return pipe(
            this.aliveCells,
            chain(eqPoint)((pos) => this.blockAt(pos))
        )
    }

    private printLine(rowIndex: number): string {
        return Array.from(Array(this.size).keys()).map(colIndex => {
            if (this.isAliveAt(new Position(rowIndex, colIndex))) {
                return 'X';
            } else {
                return '_';
            }
        }).join('');
    }

}
