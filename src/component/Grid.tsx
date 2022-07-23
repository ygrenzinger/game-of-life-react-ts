import { GameOfLife, Position } from "../domain/GameOfLife";
import { CellState } from "../domain/CellState";

type CellProps = {
  state: CellState;
  position: Position;
  handleCellClick: (event: any) => void;
};

const Cell = (props: CellProps) => {
  const { state, position, handleCellClick } = props;
  return (
    <div
      className={state}
      data-testid={position.toString()}
      id={position.toString()}
      onClick={handleCellClick}
    ></div>
  );
};

type GridProps = {
  gameOfLife: GameOfLife;
  handleCellClick: (event: any) => void;
};
const Grid = ({ gameOfLife, handleCellClick }: GridProps) => {
  const generateCells = () => {
    const cells = [];
    for (let rowIndex = 0; rowIndex < gameOfLife.size; rowIndex++) {
      for (let columnIndex = 0; columnIndex < gameOfLife.size; columnIndex++) {
        const position = new Position(rowIndex, columnIndex);
        const state = gameOfLife.cellStateAt(position);
        cells.push(
          <Cell
            key={position.toString()}
            position={position}
            state={state}
            handleCellClick={handleCellClick}
          ></Cell>
        );
      }
    }
    return cells;
  };

  const style = { "--grid-size": gameOfLife.size } as React.CSSProperties;

  return (
    <div id="grid" className="wrapper" style={style}>
      {generateCells()}
    </div>
  );
};

export default Grid;
