import { CellState, dead, alive } from "./CellState";

class Cell {
    readonly state: CellState;

    constructor(state: CellState) {
        this.state = state;
    }

    static create(cellState = dead) : Cell {
        return new Cell(cellState);
    }

    public isAlive() {
        return this.state.isAlive;
    } 

    public makeAlive() : Cell {
        return new Cell(alive);
    } 
}

export default Cell;