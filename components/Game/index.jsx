import { useState } from "react";
import Board from "../Board";

export default function Game() {
    const initialBoard = [...Array(27).fill(null), false, true, ...Array(6).fill(null), true, false, ...Array(27).fill(null)];
    const [history, setHistory] = useState([initialBoard]);
    const [currentMove, setCurrentMove] = useState(0);
    const darkIsNext = currentMove % 2 === 0;
    const currentDisks = history[currentMove];
    const handlePlay = (num) => {
        if (currentDisks[num] !== null) return;
        const nextDisks = currentDisks.slice();
        nextDisks[num] = darkIsNext;
        const nextHistory = [...history.slice(), nextDisks];

        setHistory(nextHistory);
        setCurrentMove(currentMove + 1);
    };

    return (
        <Board currentDisks={currentDisks} darkIsNext={darkIsNext} handlePlay={handlePlay}/>
    );
}
