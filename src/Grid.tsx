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
  random: boolean;
  generationCount: number;
};
const Grid = ({ size, random }: GridProps) => {
  const [gameOfLife, setGameOfLife] = useState(() =>
    GameOfLife.of(size, random)
  );

  function nextGeneration() {
    const next = gameOfLife.nextGeneration();
    setGameOfLife(next);
  }

  useEffect(() => {
    const generatorId = setInterval(nextGeneration, 1000);
    return function cleanup() {
      clearInterval(generatorId);
    };
  }, [gameOfLife]);

  const handleCellClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const id = event.currentTarget.id;
    const position = Position.parse(id);
    setGameOfLife(gameOfLife.switchStateAt(position));
  };

  const generateCells = () => {
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
