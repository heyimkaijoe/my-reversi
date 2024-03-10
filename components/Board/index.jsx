import BoardRow from "../BoardRow";

export default function Board({ currentSquares, handlePlay, playableSquares }) {
    const chunks = [];
    const chunkSize = 8;
    for (let i = 0; i < currentSquares.length; i += chunkSize) {
        const chunk = {
            "current": currentSquares.slice(i, i + chunkSize),
            "playable": playableSquares.slice(i, i + chunkSize),
        };
        chunks.push(chunk);
    };
    const boardRows = chunks.map((chunk, idx) => {
        return <BoardRow key={idx} row={idx} squares={chunk.current} playableSquares={chunk.playable} handlePlay={handlePlay} />;
    });
    
    

    return (
        <div className="flex flex-col">
            <div>{boardRows}</div>
        </div>
    );
}
