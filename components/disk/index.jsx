import React, { useState } from 'react'
import '../../src/App.css'

const Disk = () => {
    const [toggle, setToggle] = useState(false);
    const handleClick = () => {
        setToggle(!toggle);
    }

    return (
        <button
            onClick={handleClick}
            className={ toggle ? 'black-disk' : 'white-disk'}
        >
            X
        </button>
    )
}

export default Disk;