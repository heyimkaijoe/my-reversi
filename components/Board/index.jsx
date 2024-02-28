import BoardRow from "../BoardRow";

export default function Board({ currentDisks, darkIsNext, handlePlay }) {
    let chunks = [];
    const chunkSize = 8;
    for (let i = 0; i < currentDisks.length; i += chunkSize) {
        const chunk = currentDisks.slice(i, i + chunkSize);
        chunks.push(chunk);
    };
    const boardRows = chunks.map((chunk, idx) => {
        return <BoardRow key={idx} row={idx} disks={chunk} handlePlay={handlePlay} />;
    });
    let status = "Next player: " + (darkIsNext ? "Dark" : "Light");

    return (
        <>
            <div className="text-3xl mb-2">{status}</div>
            <div>{boardRows}</div>
        </>
    );
}
