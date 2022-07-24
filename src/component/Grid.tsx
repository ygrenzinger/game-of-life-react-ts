import React from "react";
import { CellState } from "../domain/CellState";
import GameOfLife from "../domain/GameOfLife";
import Position from "../domain/Position";

type CellProps = {
  state: CellState;
  position: Position;
  handleCellClick: (event: any) => void;
};

function Cell(props: CellProps) {
  const { state, position, handleCellClick } = props;
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={state}
      data-testid={position.toString()}
      id={position.toString()}
      onClick={handleCellClick}
    />
  );
}

type GridProps = {
  gameOfLife: GameOfLife;
  handleCellClick: (event: any) => void;
};
function Grid({ gameOfLife, handleCellClick }: GridProps) {
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
          />
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
}

export default Grid;
