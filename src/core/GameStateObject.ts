import Visitable from './Visitable';

interface GameStateObject extends Visitable{
    clone(): GameStateObject;
} 

export default GameStateObject; 