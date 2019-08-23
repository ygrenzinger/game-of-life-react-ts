import { CellState, dead, alive } from "./CellState";

class Cell {
    readonly rowIndex: number;
    readonly columnIndex: number;
    readonly state: CellState;

    constructor(rowIndex: number, columnIndex: number, state: CellState) {
        this.rowIndex = rowIndex;
        this.columnIndex = columnIndex;
        this.state = state;
    }

    static createDeadCell(rowIndex: number, columnIndex: number) : Cell {
        return new Cell(rowIndex, columnIndex, dead);
    }

    public isAlive() {
        return this.state.isAlive;
    } 

    public makeAlive() : Cell {
        return new Cell(this.rowIndex, this.columnIndex, alive);
    } 
}

export default Cell;