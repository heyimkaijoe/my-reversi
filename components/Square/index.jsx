export default function Square({ row, col, isDarkDisk, onPlay, isPlayable }) {
    let diskColoringClass;
    if (isDarkDisk) {
        diskColoringClass = " bg-black";
    } else if (isDarkDisk === false) {
        diskColoringClass = " bg-white";
    };

    return (
        <button className={"size-12 p-2 border" + (isPlayable ? " bg-green-300" : "")} onClick={() => onPlay(row, col)}>
            <div className={diskColoringClass ? ("size-8 rounded-full" + diskColoringClass) : ""}></div>
        </button>
    );
}
