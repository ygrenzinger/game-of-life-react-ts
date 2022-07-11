import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div id="grid" className="wrapper">
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
      <div className="cell"></div>
    </div>
  )
}

export default App
