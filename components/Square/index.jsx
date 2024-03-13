export default function Square({ row, col, diskIsDark, onPlay, isPlayable }) {
    let diskColoringClass;
    if (diskIsDark) {
        diskColoringClass = " dark-disk";
    } else if (diskIsDark === false) {
        diskColoringClass = " light-disk";
    };

    return (
        <button className={"size-10 md:size-12 p-2 border border-black" + (isPlayable ? " bg-green-200" : "")} onClick={() => onPlay(row, col)}>
            <div className={diskColoringClass ? ("size-6 md:size-8 rounded-full" + diskColoringClass) : ""}></div>
        </button>
    );
}
