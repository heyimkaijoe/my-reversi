import { useState } from "react";
import Board from "../Board";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

let flippable = [];
let temp = [];
let cumNoLegalMoves = [];

export default function Game() {
    const initialBoard = [...Array(27).fill(null), false, true, ...Array(6).fill(null), true, false, ...Array(27).fill(null)];

    const [history, setHistory] = useState([initialBoard]);
    const [currentMove, setCurrentMove] = useState(0);
    const [darkIsWinner, setDarkIsWinner] = useState(undefined);

    const currDarkIsNext = calcDarkIsNext(currentMove);
    const currentSquares = history[currentMove];
    const currPlayableSquares = calcPlayableSquares(currentMove, currentSquares);

    const assessWinner = (squares) => {
        const darkCount = countDisksByType(squares, true);
        const lightCount = countDisksByType(squares, false);
    
        if (darkCount > lightCount) {
            setDarkIsWinner(true);
        } else if (darkCount < lightCount) {
            setDarkIsWinner(false);
        } else {
            setDarkIsWinner(null);
        };
    };

    const checkNextMoves = (nextMove, nextSquares) => {
        if (nextSquares.every((square) => square !== null)) {
            assessWinner(nextSquares);
        } else if (calcPlayableSquares(nextMove, nextSquares).every((square) => square === false)) {
            const nextPlayer = (calcDarkIsNext(nextMove) ? "Dark" : "Light") + " player";
            alert(`${nextPlayer} has no next move!`);
            cumNoLegalMoves.push(nextMove);

            if (cumNoLegalMoves.length > 1) {
                assessWinner(nextSquares);
            } else {
                setHistory(history => [...history, nextSquares]);
                setCurrentMove(move => move + 1);
                
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
        setDarkIsWinner(undefined);
    };

    const resetGame = () => {
        setHistory([initialBoard]);
        setCurrentMove(0);
        setDarkIsWinner(undefined);
    };

    let winnerStatus;
    let winnerStatusClass;
    if (darkIsWinner) {
        winnerStatus = "Dark";
        winnerStatusClass = "dark-text";
    } else if (darkIsWinner === false) {
        winnerStatus = "Light";
        winnerStatusClass = "light-text";
    } else if (darkIsWinner === null) {
        winnerStatus = "Draw";
    } else {
        winnerStatus = "????";
    };

    return (
        <div className="flex flex-col-reverse md:flex-row justify-center">
            <div className="mx-auto md:mx-0 p-6 border rounded border-black bg-[#48120c]">
                <div className="bg-green-600 border border-black rounded">
                    <Board currentSquares={currentSquares}
                            handlePlay={handlePlay}
                            playableSquares={currPlayableSquares}
                    />
                </div>
            </div>

            <div className="flex justify-around md:justify-normal items-center md:flex-col font-semibold mb-3 md:mx-6">
                <div className="min-w-[118px] md:min-w-[160px] inline-block text-2xl md:text-4xl text-white p-2 md:mb-6">
                    <div className="score">
                        {(darkIsWinner === undefined && currDarkIsNext) &&
                            <FontAwesomeIcon icon={faArrowRight} className="text-blue-700" beatFade />}
                        <div className="size-8 md:size-10 rounded-full dark-disk"></div>
                        <div className="w-8 md:w-10 text-right">{countDisksByType(currentSquares, true)}</div>
                    </div>

                    <div className="score mt-2">
                        {(darkIsWinner === undefined && !currDarkIsNext) &&
                            <FontAwesomeIcon icon={faArrowRight} className="text-blue-700" beatFade />}
                        <div className="size-8 md:size-10 rounded-full light-disk"></div>
                        <div className="w-8 md:w-10 text-right">{countDisksByType(currentSquares, false)}</div>
                    </div>
                </div>

                <fieldset className="winner">
                    <legend className="text-lg md:text-2xl">&nbsp;Winner&nbsp;</legend>
                    <span className={winnerStatusClass}>{winnerStatus}</span>
                </fieldset>

                <div className="flex gap-2 md:self-stretch text-3xl md:gap-4 md:mt-40">
                    <button onClick={jumpToLastMove} className="button">
                        <FontAwesomeIcon icon={faArrowRight} rotation={180} size="lg" className="text-orange-600" />
                    </button>

                    <button onClick={resetGame} className="button">
                        <FontAwesomeIcon icon={faArrowsRotate} size="lg" className="text-red-600" />
                    </button>
                </div>
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
    collectFlippable(darkIsNext, squares);
    // horizontal -
    for (let i = col - 1; i >= minSquareIdx; i--) {
        let squareIdx = calcSquareIdx(row, i);
        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    };
    collectFlippable(darkIsNext, squares);

    // vertical +
    for (let i = row + 1; i <= maxSquareIdx; i++) {
        let squareIdx = calcSquareIdx(i, col);
        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    collectFlippable(darkIsNext, squares);
    // vertical -
    for (let i = row - 1; i >= minSquareIdx; i--) {
        let squareIdx = calcSquareIdx(i, col);
        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    };
    collectFlippable(darkIsNext, squares);

    // positive slope +
    for (let i = 1; i <= 7; i++) {
        let nextRow = row + i;
        let nextCol = col - i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    collectFlippable(darkIsNext, squares);
    // positive slope -
    for (let i = 1; i <= 7; i++) {
        let nextRow = row - i;
        let nextCol = col + i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    collectFlippable(darkIsNext, squares);

    // negative slope +
    for (let i = 1; i <= 7; i++) {
        let nextRow = row + i;
        let nextCol = col + i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    collectFlippable(darkIsNext, squares);
    // negative slope -
    for (let i = 1; i <= 7; i++) {
        let nextRow = row - i;
        let nextCol = col - i;
        let squareIdx = calcSquareIdx(nextRow, nextCol);

        if (findFlippable(darkIsNext, squares, squareIdx) === undefined) break;
    }
    collectFlippable(darkIsNext, squares);

    if (flippable.length !== 0) {
        const nextSquares = squares.slice();
        flippable.forEach((num) => {
            nextSquares[num] = darkIsNext;
        });
        flippable = [];
        return nextSquares;
    } else {
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

function countDisksByType(squares, diskIsDark) {
    return squares.filter((disk) => disk === diskIsDark).length;
}
