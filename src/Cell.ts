import { CellState, dead, alive } from "./CellState";

class Cell {
    readonly state: CellState;

    constructor(state: CellState) {
        this.state = state;
    }

    static createDeadCell() : Cell {
        return new Cell(dead);
    }

    public isAlive() {
        return this.state.isAlive;
    } 

    public makeAlive() : Cell {
        return new Cell(alive);
    } 
}

export default Cell;