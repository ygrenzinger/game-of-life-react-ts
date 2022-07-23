export type CellState = "alive" | "dead";

export function computeNextState(
  cellState: CellState,
  numbersOfAliveNeighbours: number
): CellState {
  if (numbersOfAliveNeighbours == 3) {
    return "alive";
  }
  if (cellState == "alive" && numbersOfAliveNeighbours == 2) {
    return "alive";
  }
  return "dead";
}
