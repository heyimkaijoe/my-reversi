import { useState } from "react";
import Board from "../Board";

export default function Game() {
    const initialBoard = [...Array(27).fill(null), false, true, ...Array(6).fill(null), true, false, ...Array(27).fill(null)];
    const [history, setHistory] = useState([initialBoard]);
    const [currentMove, setCurrentMove] = useState(0);
    const darkIsNext = currentMove % 2 === 0;
    const currentDisks = history[currentMove];
    const handlePlay = (num) => {
        console.log(`${num} Clicked`);
        if (currentDisks[num] !== null) return;

        const nextDisks = flipDisks(num);
        if (nextDisks) {
            nextDisks[num] = darkIsNext;
            const nextHistory = [...history.slice(), nextDisks];

            setHistory(nextHistory);
            setCurrentMove(currentMove + 1);
        } else {
            return;
        };
    };

    let flippable = [];
    let temp = [];
    const collectFlippable = () => {};
    const flipDisks = (row, col) => {
        const nextDisks = currentDisks.slice();
        const maxDiskIdx = 7;
        const minDiskIdx = 0;

        // horizontal +
        for (let i = col + 1; i <= maxDiskIdx; i++) {
            let diskIdx = calcDiskIdx(row, i);
            if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
            temp.push(i);
        };
        console.log(`hor +: ${temp}`);
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];
        // horizontal -
        for (let i = col - 1; i >= minDiskIdx; i--) {
            let diskIdx = calcDiskIdx(row, i);
            if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
            temp.push(i);
        };
        console.log(`hor -: ${temp}`);
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];

        // vertical +
        for (let i = row + 1; i <= maxDiskIdx; i++) {
            let diskIdx = calcDiskIdx(i, col);
            if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
            temp.push(i);
        }
        console.log(`ver +: ${temp}`);
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];
        // vertical -
        for (let i = row - 1; row >= minDiskIdx; i--) {
            let diskIdx = calcDiskIdx(i, col);
            if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
            temp.push(i);
        };
        console.log(`ver -: ${temp}`);
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];

        // positive slope +
        for (let i = row + 1; i <= maxDiskIdx; i++) {
            for (let j = col - 1; j >= minDiskIdx; j--) {
                let diskIdx = calcDiskIdx(i, j);
                if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
                temp.push(i);
            };
        };
        console.log(`pos slope +: ${temp}`);
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];
        // positive slope -
        for (let i = row - 1; i >= minDiskIdx; i--) {
            for (let j = col + 1; j <= maxDiskIdx; j++) {
                let diskIdx = calcDiskIdx(i, j);
                if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
                temp.push(i);
            };
        };
        console.log(`pos slope -: ${temp}`);
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];

        // negative slope +
        for (let i = row + 1; i <= maxDiskIdx; i++) {
            for (let j = col + 1; j <= maxDiskIdx; j++) {
                let diskIdx = calcDiskIdx(i, j);
                if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
                temp.push(i);
            };
        };
        console.log(`neg slope +: ${temp}`);
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];
        // negative slope -
        for (let i = row - 1; i >= 0; i--) {
            for (let j = col - 1; j >= 0; j--) {
                let diskIdx = calcDiskIdx(i, j);
                if (nextDisks[diskIdx] === null || nextDisks[diskIdx] === undefined || (temp.filter((idx) => nextDisks[idx] === darkIsNext).length === 1)) break;
                temp.push(i);
            };
        };
        console.log(`neg slope -: ${temp}`);
        // ------ duplicate here ------
        if (!(temp.every((idx) => nextDisks[idx] === !darkIsNext))) flippable = flippable.concat(temp.slice(0, temp.length - 1));
        temp = [];
        // ------ duplicate here ------
        // TODO: make duplicates into function
        // TODO: make back button
        console.log(`flippable: ${flippable}`);
        if (flippable.length !== 0) {
            flippable.forEach((num) => {
                nextDisks[num] = darkIsNext;
            });
            return nextDisks;
        } else {
            console.log("no flippable");
            return;
        };
    };

    return (
        <Board currentDisks={currentDisks} darkIsNext={darkIsNext} handlePlay={handlePlay}/>
    );
}

function calcDiskIdx(row, col) {
    return row * 8 + col;
}
