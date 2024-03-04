import { useState } from "react";
import Board from "../Board";

export default function Game() {
    const initialBoard = [...Array(27).fill(null), false, true, ...Array(6).fill(null), true, false, ...Array(27).fill(null)];
    const [history, setHistory] = useState([initialBoard]);
    const [currentMove, setCurrentMove] = useState(0);
    const darkIsNext = currentMove % 2 === 0;
    const currentDisks = history[currentMove];
    const handlePlay = (row, col) => {
        const diskIdx = calcDiskIdx(row, col);
        console.log(`${diskIdx} Clicked`);
        if (currentDisks[diskIdx] !== null) return;

        const nextDisks = flipDisks(row, col);
        if (nextDisks) {
            nextDisks[diskIdx] = darkIsNext;
            const nextHistory = [...history.slice(), nextDisks];

            setHistory(nextHistory);
            setCurrentMove(currentMove + 1);
        } else {
            return;
        };
    };

    let flippable = [];
    let temp = [];
    const findFlippable = (diskIdx) => {
        if (currentDisks[diskIdx] === null || currentDisks[diskIdx] === undefined || (temp.filter((idx) => currentDisks[idx] === darkIsNext).length === 1)) return;
        return temp.push(diskIdx);
    };
    const collectFlippable = () => {
        if (!(temp.every((idx) => currentDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];
    };
    const flipDisks = (row, col) => {
        const maxDiskIdx = 7;
        const minDiskIdx = 0;

        // horizontal +
        for (let i = col + 1; i <= maxDiskIdx; i++) {
            let diskIdx = calcDiskIdx(row, i);
            if (findFlippable(diskIdx) === undefined) break;
        };
        console.log(`hor +: ${temp}`);
        collectFlippable();
        // horizontal -
        for (let i = col - 1; i >= minDiskIdx; i--) {
            let diskIdx = calcDiskIdx(row, i);
            if (findFlippable(diskIdx) === undefined) break;
        };
        console.log(`hor -: ${temp}`);
        collectFlippable();

        // vertical +
        for (let i = row + 1; i <= maxDiskIdx; i++) {
            let diskIdx = calcDiskIdx(i, col);
            if (findFlippable(diskIdx) === undefined) break;
        }
        console.log(`ver +: ${temp}`);
        collectFlippable();
        // vertical -
        for (let i = row - 1; i >= minDiskIdx; i--) {
            let diskIdx = calcDiskIdx(i, col);
            if (findFlippable(diskIdx) === undefined) break;
        };
        console.log(`ver -: ${temp}`);
        collectFlippable();

        // positive slope +
        for (let i = 1; i <= 7; i++) {
            let nextRow = row + i;
            let nextCol = col - i;
            let diskIdx = calcDiskIdx(nextRow, nextCol);

            if (findFlippable(diskIdx) === undefined) break;
        }
        console.log(`pos slope +: ${temp}`);
        collectFlippable();
        // positive slope -
        for (let i = 1; i <= 7; i++) {
            let nextRow = row - i;
            let nextCol = col + i;
            let diskIdx = calcDiskIdx(nextRow, nextCol);

            if (findFlippable(diskIdx) === undefined) break;
        }
        console.log(`pos slope -: ${temp}`);
        collectFlippable();

        // negative slope +
        for (let i = 1; i <= 7; i++) {
            let nextRow = row + i;
            let nextCol = col + i;
            let diskIdx = calcDiskIdx(nextRow, nextCol);

            if (findFlippable(diskIdx) === undefined) break;
        }
        console.log(`neg slope +: ${temp}`);
        collectFlippable();
        // negative slope -
        for (let i = 1; i <= 7; i++) {
            let nextRow = row - i;
            let nextCol = col - i;
            let diskIdx = calcDiskIdx(nextRow, nextCol);

            if (findFlippable(diskIdx) === undefined) break;
        }
        console.log(`neg slope -: ${temp}`);
        collectFlippable();

        // TODO: make back(last move) button
        console.log(`flippable: ${flippable}`);
        if (flippable.length !== 0) {
            const nextDisks = currentDisks.slice();
            flippable.forEach((num) => {
                nextDisks[num] = darkIsNext;
            });
            return nextDisks;
        } else {
            console.log("no flippable");
            return;
        };
    };
    const jumpToLastMove = () => {
        setHistory(history.slice(0, -1));
        setCurrentMove(currentMove - 1);
    };

    return (
        <div className="flex justify-center">
            <Board currentDisks={currentDisks} darkIsNext={darkIsNext} handlePlay={handlePlay}/>
            <button onClick={jumpToLastMove} className="ml-4 border rounded p-2 cursor-pointer">Last Move</button>
        </div>
    );
}

function calcDiskIdx(row, col) {
    if ((0 <= row && row <= 7) && (0 <= col && col <= 7)) {
        return row * 8 + col;
    };
}
