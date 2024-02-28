export default function Disk({ isDarkDisk }) {
    let value;
    if (isDarkDisk) {
        value = "T";
    } else if (isDarkDisk === false) {
        value = "F";
    } else {
        value = "X";
    };

    return <div>{value}</div>
}
