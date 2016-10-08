import GameState from './GameState';
import Visitor from './Visitor';

interface GameStateRenderer extends Visitor {
    render(state: GameState): void;
}

export default GameStateRenderer;