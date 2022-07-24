import React, { useState, useEffect } from "react";
import { useInterval } from "usehooks-ts";
import GameOfLife from "../domain/GameOfLife";
import Position from "../domain/Position";
import Grid from "./Grid";

type GameProps = {
  random: boolean;
  size: number;
};

function Game(props: GameProps) {
  const { random, size } = props;
  const [running, setRunning] = useState(false);

  const [gameOfLife, setGameOfLife] = useState(GameOfLife.of(size, random));

  useEffect(() => {
    setGameOfLife(GameOfLife.of(size, random));
  }, [size, random]);

  const handleCellClick = (event: React.MouseEvent<HTMLElement>) => {
    const { id } = event.currentTarget;
    const position = Position.parse(id);
    setGameOfLife(gameOfLife.switchStateAt(position));
  };

  useInterval(() => {
    if (running) {
      const next = gameOfLife.nextGeneration();
      setGameOfLife(next);
    }
  }, 1000);

  const switchRun = () => {
    setRunning(!running);
  };

  return (
    <div>
      <div>
        <button type="button" data-testid="run" onClick={switchRun}>
          {running ? "stop" : "start"}
        </button>
      </div>
      <div>
        <Grid gameOfLife={gameOfLife} handleCellClick={handleCellClick} />
      </div>
    </div>
  );
}

export default Game;
