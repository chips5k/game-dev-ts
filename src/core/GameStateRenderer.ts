import GameState from './GameState';
import GameStateObject from './GameStateObject';

interface GameStateRenderer {
    render(state: GameState): void;
    visit(o: GameStateObject): void;
}

export default GameStateRenderer;