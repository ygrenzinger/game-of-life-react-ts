import Board from "./Board";

class GameOfLife {
    readonly board: Board;
    constructor(board: Board) {
        this.board = board;
    }

    public static fromAsciiArt(art: string): GameOfLife {
        return new GameOfLife(Board.fromAsciiArt(art));
    }

    public toAsciiArt(): string {
        return this.board.toAsciiArt();
    }

    public nextGeneration(): GameOfLife {
        
        return this;
    }
}

export default GameOfLife;