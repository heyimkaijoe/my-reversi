import Disk from "../Disk";

export default function BoardRow({ disks }) {
    console.log(disks);
    const Disks = disks.map((disk, idx) => {
        return <Disk key={idx} isDarkDisk={disk} />
    })

    return (
        <div className="flex">{Disks}</div>
    );
}
