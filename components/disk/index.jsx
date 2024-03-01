export default function Disk({ row, col, isDarkDisk, onPlay }) {
    const num = row * 8 + col;
    let coloringClasses;
    if (isDarkDisk) {
        coloringClasses = "bg-black";
    } else if (isDarkDisk === false) {
        coloringClasses = "bg-white";
    };

    return (
        <button className="size-12 p-2 border" onClick={() => onPlay(num)}>
            <div className={coloringClasses ? ("size-8 rounded-full " + coloringClasses) : ""}></div>
        </button>
    );
}
