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

    get rows() : ReadonlyArray<Row> {
        return this._rows;
    }

    constructor(rows: Array<Row>) {
        this._rows = rows; 
    }

    public static create(size: number): Board {
        return new Board([...Array(size)].map(rowIndex => new Row(size, rowIndex)))
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
}

export default Board;