import BoardRow from "../BoardRow";

export default function Board({ currentSquares, darkIsNext, handlePlay, playableSquares }) {
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
    const status = "Next player: " + (darkIsNext ? "Dark" : "Light");
    const countDisksByType = (isDarkDisk) => currentSquares.filter((disk) => disk === isDarkDisk).length;
    const scores = "Dark: " + countDisksByType(true) + ", Light: " + countDisksByType(false);

    return (
        <div className="flex flex-col">
            <div className="text-3xl mb-2">{status}</div>
            <div className="text-2xl mb-2">{scores}</div>
            <div>{boardRows}</div>
        </div>
    );
}
