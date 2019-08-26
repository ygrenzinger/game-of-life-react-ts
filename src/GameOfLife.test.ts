import GameOfLife from "./GameOfLife"

describe("Game of Life", () => {
    it("it should handle Still lifes pattern like block", () => {
        expect(GameOfLife.fromAsciiArt(`
            oooo
            oxxo
            oxxo
            oooo`
        ).nextGeneration()).toEqual(GameOfLife.fromAsciiArt(`
            oooo
            oxxo
            oxxo
            oooo`
        ))
    });

    it("it should handle Oscillators pattern like blinker", () => {
        expect(GameOfLife.fromAsciiArt(`
            ooooo
            ooxoo
            ooxoo
            ooxoo
            ooooo`
        ).nextGeneration()).toEqual(GameOfLife.fromAsciiArt(`
            ooooo
            ooooo
            oxxxo
            ooooo
            ooooo`
        ))
    });
})