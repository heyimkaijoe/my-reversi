import { useState } from "react";
import Board from "../Board";

export default function Game() {
    const initialBoard = [...Array(27).fill(null), false, true, ...Array(6).fill(null), true, false, ...Array(27).fill(null)];
    const [history, setHistory] = useState([initialBoard]);
    const [currentMove, setCurrentMove] = useState(0);
    const darkIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    let flippable = [];
    let temp = [];
    const findFlippable = (squareIdx) => {
        if (currentSquares[squareIdx] === null || currentSquares[squareIdx] === undefined || (temp.filter((idx) => currentSquares[idx] === darkIsNext).length === 1)) return;
        return temp.push(squareIdx);
    };
    const collectFlippable = () => {
        if (!(temp.every((idx) => currentSquares[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];
    };
    const flipDisks = (row, col) => {
        const maxSquareIdx = 7;
        const minSquareIdx = 0;

        // horizontal +
        for (let i = col + 1; i <= maxSquareIdx; i++) {
            let squareIdx = calcSquareIdx(row, i);
            if (findFlippable(squareIdx) === undefined) break;
        };
        // console.log(`hor +: ${temp}`);
        collectFlippable();
        // horizontal -
        for (let i = col - 1; i >= minSquareIdx; i--) {
            let squareIdx = calcSquareIdx(row, i);
            if (findFlippable(squareIdx) === undefined) break;
        };
        // console.log(`hor -: ${temp}`);
        collectFlippable();

        // vertical +
        for (let i = row + 1; i <= maxSquareIdx; i++) {
            let squareIdx = calcSquareIdx(i, col);
            if (findFlippable(squareIdx) === undefined) break;
        }
        // console.log(`ver +: ${temp}`);
        collectFlippable();
        // vertical -
        for (let i = row - 1; i >= minSquareIdx; i--) {
            let squareIdx = calcSquareIdx(i, col);
            if (findFlippable(squareIdx) === undefined) break;
        };
        // console.log(`ver -: ${temp}`);
        collectFlippable();

        // positive slope +
        for (let i = 1; i <= 7; i++) {
            let nextRow = row + i;
            let nextCol = col - i;
            let squareIdx = calcSquareIdx(nextRow, nextCol);

            if (findFlippable(squareIdx) === undefined) break;
        }
        // console.log(`pos slope +: ${temp}`);
        collectFlippable();
        // positive slope -
        for (let i = 1; i <= 7; i++) {
            let nextRow = row - i;
            let nextCol = col + i;
            let squareIdx = calcSquareIdx(nextRow, nextCol);

            if (findFlippable(squareIdx) === undefined) break;
        }
        // console.log(`pos slope -: ${temp}`);
        collectFlippable();

        // negative slope +
        for (let i = 1; i <= 7; i++) {
            let nextRow = row + i;
            let nextCol = col + i;
            let squareIdx = calcSquareIdx(nextRow, nextCol);

            if (findFlippable(squareIdx) === undefined) break;
        }
        // console.log(`neg slope +: ${temp}`);
        collectFlippable();
        // negative slope -
        for (let i = 1; i <= 7; i++) {
            let nextRow = row - i;
            let nextCol = col - i;
            let squareIdx = calcSquareIdx(nextRow, nextCol);

            if (findFlippable(squareIdx) === undefined) break;
        }
        // console.log(`neg slope -: ${temp}`);
        collectFlippable();

        if (flippable.length !== 0) {
            // console.log(`flippable: ${flippable}`);
            const nextSquares = currentSquares.slice();
            flippable.forEach((num) => {
                nextSquares[num] = darkIsNext;
            });
            flippable = [];
            return nextSquares;
        } else {
            // console.log("no flippable");
            return;
        };
    };
    
    const jumpToLastMove = () => {
        if (currentMove === 0) return;
        setHistory(history.slice(0, -1));
        setCurrentMove(currentMove - 1);
    };
    const resetGame = () => {
        setHistory([initialBoard]);
        setCurrentMove(0);
    };

    const playableSquares = currentSquares.slice().map((square, idx) => {
        if (square === null) {
            let rowNCol = calRowNCol(idx);
            return (flipDisks(rowNCol.row, rowNCol.col) === undefined) ? false : true;
        } else {
            return false;
        };
    });
    const handlePlay = (row, col) => {
        const squareIdx = calcSquareIdx(row, col);
        console.log(`${squareIdx} Clicked`);
        if (currentSquares[squareIdx] !== null) return;

        const nextSquares = flipDisks(row, col);
        if (nextSquares) {
            nextSquares[squareIdx] = darkIsNext;
            const nextHistory = [...history.slice(), nextSquares];

            setHistory(nextHistory);
            setCurrentMove(currentMove + 1);
        };
    };

    return (
        // TODO: assess winner
        // -> collect isPlayableSquare data (as playableSquares(naming?)) and check data to decide -> pass part of playableSquares down as props
        // -> no play then pass
        // -> two passes || all squares are filled == Game Over
        
        // TODO: RWD for mobile
        <div className="flex justify-center">
            <Board currentSquares={currentSquares} darkIsNext={darkIsNext} handlePlay={handlePlay} playableSquares={playableSquares}/>
            <div className="flex flex-col gap-2 ml-4">
                <button onClick={jumpToLastMove} className="border rounded p-2">Last Move</button>
                <button onClick={resetGame} className="border rounded p-2">Reset</button>
            </div>
        </div>
    );
}

function calcSquareIdx(row, col) {
    if ((0 <= row && row <= 7) && (0 <= col && col <= 7)) {
        return row * 8 + col;
    };
}

function calRowNCol(squareIdx) {
    return {
        "row": Math.floor(squareIdx / 8),
        "col": squareIdx % 8,
    };
}

function isCurrentPlayable(playableSquares) {
    return !playableSquares.every((square) => square === false);
}

function assessWinner() {}
