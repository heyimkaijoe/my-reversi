import './App.css';
import Game from '../components/Game';

export default function App() {
  return (
    <Game />
  );
}
// Game: 1(+ status + reset btn + back/next btns)
    //  Board: 1
    //   Square: 64(8x8)
    // 
    // States needed: history, currentMove
