import Square from "../Square";

export default function BoardRow({ row, squares, handlePlay, isPlayableSquare }) {
    const Squares = squares.map((square, idx) => {
        return <Square key={idx} row={row} col={idx} isDarkDisk={square} onPlay={handlePlay} isPlayable={isPlayableSquare} />;
    })

    return (
        <div className="flex justify-center">{Squares}</div>
    );
}
