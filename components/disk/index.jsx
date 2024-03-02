export default function Disk({ row, col, isDarkDisk, onPlay }) {
    let coloringClass;
    if (isDarkDisk) {
        coloringClass = "bg-black";
    } else if (isDarkDisk === false) {
        coloringClass = "bg-white";
    };

    return (
        <button className="size-12 p-2 border" onClick={() => onPlay(row, col)}>
            <div className={coloringClass ? ("size-8 rounded-full " + coloringClass) : ""}></div>
        </button>
    );
}
