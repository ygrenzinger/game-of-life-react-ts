import { useState, useEffect } from "react";
import "./App.css";
import Game from "./component/Game";

function App() {
  const [size, setSize] = useState(10);
  const [gridSize, setGridSize] = useState(size);

  const handleSubmit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGridSize(size);
  };

  return (
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
      <div>
        <Game size={gridSize} random={true}></Game>
      </div>
    </div>
  );
}

export default App;
