import BoardRow from "../BoardRow";

export default function Board({ currentDisks, darkIsNext, handlePlay, isPlayableSquare }) {
    const chunks = [];
    const chunkSize = 8;
    for (let i = 0; i < currentDisks.length; i += chunkSize) {
        const chunk = currentDisks.slice(i, i + chunkSize);
        chunks.push(chunk);
    };
    const boardRows = chunks.map((chunk, idx) => {
        return <BoardRow key={idx} row={idx} squares={chunk} handlePlay={handlePlay} isPlayableSquare={isPlayableSquare} />;
    });
    const status = "Next player: " + (darkIsNext ? "Dark" : "Light");
    const countDisksByType = (isDarkDisk) => currentDisks.filter((disk) => disk === isDarkDisk).length;
    const scores = "Dark: " + countDisksByType(true) + ", Light: " + countDisksByType(false);

    return (
        <div className="flex flex-col">
            <div className="text-3xl mb-2">{status}</div>
            <div className="text-2xl mb-2">{scores}</div>
            <div>{boardRows}</div>
        </div>
    );
}
