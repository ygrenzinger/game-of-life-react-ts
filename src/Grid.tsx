import { useState, useEffect } from "react";
import { GameOfLife, Position } from "./GameOfLife";
import { CellState } from "./CellState";

type CellProps = {
  state: CellState;
  position: Position;
  handleClick: (event: any) => void;
};

const Cell = (props: CellProps) => {
  const { state, position, handleClick } = props;
  return (
    <div
      className={state}
      data-testid={position.toString()}
      id={position.toString()}
      onClick={handleClick}
    ></div>
  );
};

type GridProps = {
  size: number;
  randomInit: boolean;
  generation: number;
};
const Grid = ({ size, randomInit, generation }: GridProps) => {
  const [gameOfLife, setGameOfLife] = useState(GameOfLife.of(size, randomInit));

  useEffect(() => {
    setGameOfLife(GameOfLife.of(size, randomInit));
  }, [size]);

  useEffect(() => {
    console.log("next Generation effect");
    const next = gameOfLife.nextGeneration();
    setGameOfLife(next);
  }, [generation]);

  const handleCellClick = (event: React.MouseEvent<HTMLElement>) => {
    const id = event.currentTarget.id;
    const position = Position.parse(id);
    setGameOfLife(gameOfLife.switchStateAt(position));
  };

  const generateCells = () => {
    console.log("generate Cells");
    const cells = [];
    for (let rowIndex = 0; rowIndex < size; rowIndex++) {
      for (let columnIndex = 0; columnIndex < size; columnIndex++) {
        const position = new Position(rowIndex, columnIndex);
        const state = gameOfLife.cellStateAt(position);
        cells.push(
          <Cell
            key={position.toString()}
            position={position}
            state={state}
            handleClick={handleCellClick}
          ></Cell>
        );
      }
    }
    return cells;
  };

  const style = { "--grid-size": size } as React.CSSProperties;

  return (
    <div id="grid" className="wrapper" style={style}>
      {generateCells()}
    </div>
  );
};

export default Grid;
