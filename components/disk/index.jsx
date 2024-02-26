import { useState } from 'react';
import '../../src/App.css';

const Disk = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    setToggle(!toggle)
  };

  return (
    <button
      onClick={handleClick}
      className={`block size-8 rounded-full ${ toggle ? 'dark-disk' : 'light-disk' }`}
    >
      O
    </button>
  );
}

export default Disk;
