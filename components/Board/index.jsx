import BoardRow from "../BoardRow";

export default function Board({ currentSquares, darkIsNext, handlePlay, playableSquares, darkIsWinner }) {
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

    let status;
    if (darkIsWinner) {
        status = "Dark player wins";
    } else if (darkIsWinner === false) {
        status = "Light player wins";
    } else if (darkIsNext === null) {
        status = "Draw";
    } else {
        status = "Next player: " + (darkIsNext ? "Dark" : "Light");
    };
    
    const countDisksByType = (diskIsDark) => currentSquares.filter((disk) => disk === diskIsDark).length;
    const scores = "Dark: " + countDisksByType(true) + ", Light: " + countDisksByType(false);

    return (
        <div className="flex flex-col">
            <div className="text-3xl mb-2">{status}</div>
            <div className="text-2xl mb-2">{scores}</div>
            <div>{boardRows}</div>
        </div>
    );
}
