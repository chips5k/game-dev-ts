import Visitable from './Visitable';

interface GameStateObject extends Visitable{
    update(milliseconds: number): void;
    clone(): GameStateObject;
}

export default GameStateObject;