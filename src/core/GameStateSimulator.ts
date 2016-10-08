import GameState from './GameState';
import Visitor from './Visitor';

interface GameStateSimulator extends Visitor {
    simulate(state: GameState, milliseconds: number): void;
}

export default GameStateSimulator;