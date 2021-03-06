import Cell from "./Cell";
import { dead, alive } from "./CellState";
import { trimMultiline } from "./Utils";

class Row {
    private _cells: Array<Cell>;
    get cells() : ReadonlyArray<Cell> {
        return this._cells;
    }

    constructor(cells: Array<Cell>) {
        this._cells = cells;
    }

    public static create(size: number, cellState = dead) {
        return new Row([...Array(size)].map(columnIndex => Cell.create(cellState)))
    }

    public static fromAsciiArt(art: string): Row {
        var row = art.split('').map(x => {
            if (x == 'o') {
                return new Cell(dead);
            }
            return new Cell(alive);
        });
        return new Row(row)

    }

    makeAlive(columnIndex: number): Row {
        this._cells[columnIndex] = this.cells[columnIndex].makeAlive();
        return this;
    }

    cellAt(columnIndex: number): Cell {
        return this.cells[columnIndex];
    }

    public toAsciiArt(): string {
        return this._cells.map(x => x.isAlive() ? 'x' : 'o').join("");
    }
}

class Board {
    private _rows: Array<Row>;

    get rows() : ReadonlyArray<Row> {
        return this._rows;
    }

    constructor(rows: Array<Row>) {
        this._rows = rows; 
    }

    public static create(size: number, cellState = dead): Board {
        return new Board([...Array(size)].map(_ =>  Row.create(size, cellState)))
    }

    public static fromAsciiArt(art: string): Board {
        var rows = trimMultiline(art)
            .split('\n')
            .map(x => Row.fromAsciiArt(x));
        
        return new Board(rows);
    }

    public cells(): ReadonlyArray<Cell> {
        return this._rows.flatMap(row => row.cells);
    }

    makeAlive(rowIndex: number, columnIndex: number): Board {
        let newRows = Array.from(this._rows);
        newRows[rowIndex] = newRows[rowIndex].makeAlive(columnIndex);
        return new Board(newRows);
    }
    
    cellAt(rowIndex: number, columnIndex: number): Cell {
        return this._rows[rowIndex].cellAt(columnIndex);
    }

    computeNumberOfAliveNeigbours(rowIndex: number, columnIndex: number): number {
        const shifts = [-1,0,1]
        return shifts
            .flatMap(i => shifts.map(j => [i, j]))
            .map(([i,j]) => [rowIndex+i,columnIndex+j])
            .filter(([i,j]) => !(i == rowIndex && j == columnIndex))
            .filter(([i,j]) => this.cellAt(i,j).isAlive())
            .length
    }

    public toAsciiArt(): string {
        return this._rows.map(x => x.toAsciiArt()).join('\n');
    }
}

export default Board;