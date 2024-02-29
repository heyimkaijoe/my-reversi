export default function Disk({ row, col, isDarkDisk, onPlay }) {
    // TODO: turn value into dark/light disk(circle)
    let value;
    if (isDarkDisk) {
        value = "D";
    } else if (isDarkDisk === false) {
        value = "L";
    };
    const num = row * 8 + col;

    return <button className="size-12 p-2 border" onClick={() => onPlay(num)}>{value}</button>;
}
