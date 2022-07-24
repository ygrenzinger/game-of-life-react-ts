import React, { useState } from "react";
import "./App.css";
import Game from "./component/Game";

function App() {
  const [size, setSize] = useState(10);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSize = parseInt(
      (e.currentTarget.elements.namedItem("size") as HTMLInputElement).value,
      10
    );
    setSize(newSize);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Size:
          <input type="number" name="size" defaultValue={size} />
        </label>
        <input type="submit" value="Create" />
      </form>
      <div>
        <Game size={size} random />
      </div>
    </div>
  );
}

export default App;
