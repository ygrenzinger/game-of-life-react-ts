import React, { useState, useEffect } from "react";
import "./App.css";
import Game from "./component/Game";

function App() {
  const [size, setSize] = useState(10);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const size = parseInt(
      (e.currentTarget.elements.namedItem("size") as HTMLInputElement).value
    );
    setSize(size);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Size:
          <input type="number" name="size" defaultValue={size} />
        </label>
        <input type="submit" value="Create" />
      </form>
      <div>
        <Game size={size} random={true}></Game>
      </div>
    </div>
  );
}

export default App;
