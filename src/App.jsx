import './App.css';
import Disk from '../components/disk';

function App() {
  return (
    <>
      <div className='w-24 grid grid-cols-3'>
        <Disk/>
        <Disk/>
        <Disk/>
        <Disk/>
        <Disk/>
        <Disk/>
        <Disk/>
        <Disk/>
        <Disk/>
      </div>
    </>
  );
}

export default App;
