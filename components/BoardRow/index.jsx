import Disk from "../Disk";

export default function BoardRow({ row, disks, handlePlay }) {
    // console.log(disks);
    const Disks = disks.map((disk, idx) => {
        return <Disk key={idx} row={row} col={idx} isDarkDisk={disk} onPlay={handlePlay} />;
    })

    return (
        <div className="flex justify-center">{Disks}</div>
    );
}
