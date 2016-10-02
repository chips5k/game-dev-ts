import GameEngine from '../core/GameEngine';
import GameState from '../core/GameState';
import GameStateObject from '../core/GameStateObject';
import GameStateRenderer from '../core/GameStateRenderer';

import Puck from './Puck';
import PongRenderer from './PongRenderer';


class Pong {
    private engine: GameEngine;
    
    constructor(canvas: any, context: any) {
        
        var puck = new Puck(canvas.width / 2, canvas.height / 2);
        var state = new GameState(canvas.width, canvas.height);
        state.addObject(puck);


        var renderer = new PongRenderer(context, canvas);
        var game = new GameEngine(window, state, renderer);

        game.run();
    }


}

