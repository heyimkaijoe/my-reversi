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
// TODO: remove component App -> use Game component as top-level component is fine
// TODO: check if there're any places that can pass JSX as children
// ref: https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children
// hover effect -> onPointerEnter/onPointerLeave
// return <>{someCondition && <Component />}</>
