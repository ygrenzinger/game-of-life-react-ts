import React, { useState } from "react";
import { GameOfLife, Position } from './GameOfLife';
import { CellState } from './CellState';

type CellProps = {
    state: CellState;
    position: Position;
    handleClick: (event: any) => void;
}

const Cell = (props: CellProps) => {

    const {state, position, handleClick} = props;
    const {rowIndex, columnIndex} = position;
    return (
        <div className={state} data-testid={`${rowIndex}-${columnIndex}`} onClick={handleClick}></div>
    )
}

type GridProps = {
    size: number;
}
const Grid = (props: GridProps) => {

    const {size} = props;

    const gameOfLife = GameOfLife.of(size);

    const generateCells = () => {
        const cells = [];
        for (let rowIndex = 0; rowIndex < size; rowIndex++) {
            for (let columnIndex = 0; columnIndex < size; columnIndex++) {
                const position = new Position(rowIndex, columnIndex);
                const state = gameOfLife.cellStateAt(position);
                cells.push(<Cell position={position} state={state} handleClick={}></Cell>)
            }   
        }
        return cells;
    }

    const style = { "--grid-size": size } as React.CSSProperties;

    return (
        <div id="grid" className="wrapper" style={style}>
            {generateCells()}
        </div>
    );
}

export default Grid;