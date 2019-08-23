import { CellState, dead } from "./CellState";
import Cell from "./Cell";

class Row {
    readonly rowIndex: number;

    private _cells: Array<Cell>;
    get cells() : ReadonlyArray<Cell> {
        return this._cells;
    }

    constructor(size: number, rowIndex: number) {
        this.rowIndex = rowIndex;
        this._cells = [...Array(size)].map(columnIndex => Cell.createDeadCell(rowIndex, columnIndex)); 
    }

    makeAlive(columnIndex: number): Row {
        this._cells[columnIndex] = this.cells[columnIndex].makeAlive();
        return this;
    }

    cellAt(columnIndex: number): Cell {
        return this.cells[columnIndex];
    }
}

class Board {
    private _rows: Array<Row>;

    get rows() {
        return this._rows;
    }

    constructor(size: number) {
        this._rows = [...Array(size)].map(rowIndex => new Row(size, rowIndex)); 
    }

    public cells(): ReadonlyArray<Cell> {
        return this._rows.flatMap(row => row.cells);
    }

    makeAlive(rowIndex: number, columnIndex: number): Board {
        this._rows[rowIndex] = this._rows[rowIndex].makeAlive(columnIndex);
        return this;
    }
    
    cellAt(rowIndex: number, columnIndex: number): Cell {
        return this._rows[rowIndex].cellAt(columnIndex);
    }
}

export default Board;