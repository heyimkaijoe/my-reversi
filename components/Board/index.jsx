import BoardRow from "../BoardRow";

export default function Board({ currentHistory }) {
    let chunks = [];
    const chunkSize = 8;
    for (let i = 0; i < currentHistory.length; i += chunkSize) {
        const chunk = currentHistory.slice(i, i + chunkSize);
        chunks.push(chunk);
    };
    const boardRows = chunks.map((chunk, idx) => {
        return <BoardRow key={idx} disks={chunk} />;
    });

    return (
        <div>{boardRows}</div>
    );
}
