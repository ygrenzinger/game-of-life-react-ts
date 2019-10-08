import GameOfLife from "./GameOfLife"
import { trimMultiline } from "./Utils";

describe("Game of Life", () => {
    it("it should handle Still lifes pattern like block", () => {
        expect(GameOfLife.fromAsciiArt(`
            oooo
            oxxo
            oxxo
            oooo`
        ).nextGeneration().toAsciiArt()).toBe(trimMultiline(`
            oooo
            oxxo
            oxxo
            oooo`))
    });

    it("it should handle Oscillators pattern like blinker", () => {
        expect(GameOfLife.fromAsciiArt(`
            ooooo
            ooxoo
            ooxoo
            ooxoo
            ooooo`
        ).nextGeneration().toAsciiArt()).toBe(trimMultiline(`
            ooooo
            ooooo
            oxxxo
            ooooo
            ooooo`
        ))
    });
})