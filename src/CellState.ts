export interface CellState {
    nextGeneration: (nbOAliveNeighbors: number) => CellState;
    isAlive: boolean;
}

export const alive : CellState = {
    isAlive: true,
    nextGeneration: (nbOAliveNeighbors: number): CellState => 
        (nbOAliveNeighbors == 2 || nbOAliveNeighbors == 3 ) ? alive : dead
}

export const dead : CellState = {
    isAlive: false,
    nextGeneration: (nbOAliveNeighbors: number) : CellState => 
        (nbOAliveNeighbors == 3 ) ? alive : dead
}

export const isAlive = (cellState: CellState, nbOAliveNeighbors: number): boolean => {
    return cellState.nextGeneration(nbOAliveNeighbors).isAlive;
};
