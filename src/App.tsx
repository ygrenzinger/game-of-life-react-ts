import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Grid from "./Grid";

function App() {
  const [size, setSize] = useState(3);

  return (
    <div>
      <Grid size={10} random={true}></Grid>
    </div>
  );
}

export default App;
