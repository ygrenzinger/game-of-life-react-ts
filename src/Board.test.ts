import Board from "./Board"

describe("board of 3x3", () => {

    const board = Board.create(3);
    it("board is a 3*3 grid", () => {
        expect(board.rows.length).toBe(3);
        expect(board.cells().length).toBe(9);
    });

    it("board has only dead cells at creation", () => {
        expect(board.cells().filter(cell => !cell.isAlive()).length).toBe(9)
    });

    it("you can make alive a cell", () => {
        const newBoard = board.makeAlive(1,1);
        expect(newBoard.cellAt(1,1).isAlive).toBeTruthy()
    });
})