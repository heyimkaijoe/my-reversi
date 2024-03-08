import { useState } from "react";
import Board from "../components/Board";
import "./Game.css";

let flippable = [];
let temp = [];
let cumNoLegalMoves = [];
let darkIsWinner;

export default function Game() {
    const initialBoard = [...Array(27).fill(null), false, true, ...Array(6).fill(null), true, false, ...Array(27).fill(null)];
    const [history, setHistory] = useState([initialBoard]);
    const [currentMove, setCurrentMove] = useState(0);
    const currDarkIsNext = calcDarkIsNext(currentMove);
    const currentSquares = history[currentMove];
    const currPlayableSquares = calcPlayableSquares(currentMove, currentSquares);

    const checkNextMoves = (nextMove, nextSquares) => {
        if (nextSquares.every((square) => square !== null)) {
            console.log("Game Over");
            assessWinner(nextSquares);
        } else if (calcPlayableSquares(nextMove, nextSquares).every((square) => square === false)) {
            const nextPlayer = (calcDarkIsNext(nextMove) ? "Dark" : "Light") + " player";
            alert(`${nextPlayer} has no next move!`);
            cumNoLegalMoves.push(nextMove);

            if (cumNoLegalMoves.length > 1) {
                console.log("Game Over");
                assessWinner(nextSquares);
            } else {
                checkNextMoves(nextMove + 1, nextSquares);
            };
        } else {
            // has next play
            cumNoLegalMoves = [];
        };
    };
    const handlePlay = (row, col) => {
        const squareIdx = calcSquareIdx(row, col);
        console.log(`${squareIdx} Clicked`);
        if (currentSquares[squareIdx] !== null) return;

        const nextSquares = flipDisks(currentMove, currentSquares, row, col);
        if (nextSquares) {
            nextSquares[squareIdx] = currDarkIsNext;
            const nextHistory = [...history, nextSquares];

            setHistory(nextHistory);
            setCurrentMove(currentMove + 1);

            checkNextMoves(currentMove + 1, nextSquares);
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

    return (
        // TODO: RWD for mobile
        <div className="flex justify-center">
            <Board currentSquares={currentSquares}
                   darkIsNext={currDarkIsNext}
                   handlePlay={handlePlay}
                   playableSquares={currPlayableSquares}
                   darkIsWinner={darkIsWinner}
            />
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

function calcRowNCol(squareIdx) {
    return {
        "row": Math.floor(squareIdx / 8),
        "col": squareIdx % 8,
    };
}

function calcDarkIsNext(move) {
    return move % 2 === 0;
}

function findFlippable(darkIsNext, squares, squareIdx) {
    if (squares[squareIdx] === null || squares[squareIdx] === undefined || (temp.filter((idx) => squares[idx] === darkIsNext).length === 1)) return;
    return temp.push(squareIdx);
}

function collectFlippable(darkIsNext, squares) {
    if (!(temp.every((idx) => squares[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
    temp = [];
}

function flipDisks(move, squares, row, col) {
    const maxSquareIdx = 7;
    const minSquareIdx = 0;
    const darkIsNext = calcDarkIsNext(move);

    // horizontal +
    for (let i = col + 1; i <= maxSquareIdx; i++) {
        let squareIdx = calcSquareIdx(row, i);
        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    };
    // console.log(`hor +: ${temp}`);
    collectFlippable(darkIsNext, squares);
    // horizontal -
    for (let i = col - 1; i >= minSquareIdx; i--) {
        let squareIdx = calcSquareIdx(row, i);
        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    };
    // console.log(`hor -: ${temp}`);
    collectFlippable(darkIsNext, squares);

    // vertical +
    for (let i = row + 1; i <= maxSquareIdx; i++) {
        let squareIdx = calcSquareIdx(i, col);
        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    // console.log(`ver +: ${temp}`);
    collectFlippable(darkIsNext, squares);
    // vertical -
    for (let i = row - 1; i >= minSquareIdx; i--) {
        let squareIdx = calcSquareIdx(i, col);
        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    };
    // console.log(`ver -: ${temp}`);
    collectFlippable(darkIsNext, squares);

    // positive slope +
    for (let i = 1; i <= 7; i++) {
        let nextRow = row + i;
        let nextCol = col - i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    // console.log(`pos slope +: ${temp}`);
    collectFlippable(darkIsNext, squares);
    // positive slope -
    for (let i = 1; i <= 7; i++) {
        let nextRow = row - i;
        let nextCol = col + i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    // console.log(`pos slope -: ${temp}`);
    collectFlippable(darkIsNext, squares);

    // negative slope +
    for (let i = 1; i <= 7; i++) {
        let nextRow = row + i;
        let nextCol = col + i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    // console.log(`neg slope +: ${temp}`);
    collectFlippable(darkIsNext, squares);
    // negative slope -
    for (let i = 1; i <= 7; i++) {
        let nextRow = row - i;
        let nextCol = col - i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    // console.log(`neg slope -: ${temp}`);
    collectFlippable(darkIsNext, squares);

    if (flippable.length !== 0) {
        // console.log(`flippable: ${flippable}`);
        const nextSquares = squares.slice();
        flippable.forEach((num) => {
            nextSquares[num] = darkIsNext;
        });
        flippable = [];
        return nextSquares;
    } else {
        // console.log("no flippable");
        return;
    };
}

function calcPlayableSquares(move, squares) {
    return squares.slice().map((square, idx) => {
        if (square === null) {
            let rowNCol = calcRowNCol(idx);
            return (flipDisks(move, squares, rowNCol.row, rowNCol.col) === undefined) ? false : true;
        } else {
            return false;
        };
    });
}

function assessWinner(squares) {
    const darkCount = squares.filter((square) => square === true).length;
    const lightCount = squares.filter((square) => square === false).length;

    if (darkCount > lightCount) {
        darkIsWinner = true;
    } else if (darkCount < lightCount) {
        darkIsWinner = false;
    } else {
        darkIsWinner = null;
    };
}

// TODO: check if there're any places that can pass JSX as children
// ref: https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
// hover effect -> onPointerEnter/onPointerLeave
// return <>{someCondition && <Component />}</>
