export default function Square({ row, col, diskIsDark, onPlay, isPlayable }) {
    let diskColoringClass;
    if (diskIsDark) {
        diskColoringClass = " bg-black";
    } else if (diskIsDark === false) {
        diskColoringClass = " bg-white";
    };

    return (
        <button className={"size-12 p-2 border" + (isPlayable ? " bg-green-300" : "")} onClick={() => onPlay(row, col)}>
            <div className={diskColoringClass ? ("size-8 rounded-full" + diskColoringClass) : ""}></div>
        </button>
    );
}
