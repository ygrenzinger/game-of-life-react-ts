import { useState, useEffect } from "react";
import "./App.css";
import Grid from "./Grid";

function App() {
  const [size, setSize] = useState(10);
  const [gridSize, setGridSize] = useState(size);
  const [generation, setGeneration] = useState(1);
  const [running, setRunning] = useState(false);
  let generatorId: NodeJS.Timer;

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGridSize(size);
  };

  useEffect(() => {
    if (running) {
      generatorId = setInterval(() => {
        console.log("increase generation");
        setGeneration(generation + 1);
      }, 1000);

      return function cleanup() {
        clearInterval(generatorId);
      };
    } else {
      clearInterval(generatorId);
      return function cleanup() {};
    }
  }, [running, generation]);

  const start = () => {
    setRunning(true);
  };

  const stop = () => {
    setRunning(false);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Size:
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
            />
          </label>
          <input type="submit" value="Create" />
        </form>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        Generation {generation}
      </div>
      <div>
        <Grid size={gridSize} randomInit={true} generation={generation}></Grid>
      </div>
    </div>
  );
}

export default App;
