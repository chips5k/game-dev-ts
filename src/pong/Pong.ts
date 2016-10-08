import GameEngine from '../core/GameEngine';
import GameState from '../core/GameState';
import PongRenderer from './PongRenderer';
import PongSimulator from './PongSimulator';
import Puck from './Puck';
import Paddle from './Paddle';

export default class Pong {
    engine: GameEngine;
    
    
    constructor(window: any, canvas: any, context: any) {

        //Setup game core items
        let renderer = new PongRenderer(context, canvas);
        let simulator = new PongSimulator(canvas);
        let state = new GameState();
        let engine = new GameEngine(window, state, renderer, simulator);
        
        //Setup game objects
        var paddleA = new Paddle();
        var paddleB = new Paddle();
        var puck = new Puck();

        puck.rigidBody.position.x = (canvas.width / 2) - (puck.rigidBody.dimensions.x / 2);
        puck.rigidBody.position.y = (canvas.height / 2) - (puck.rigidBody.dimensions.x / 2);
        
        paddleA.rigidBody.position.x = 5;
        paddleA.rigidBody.position.y = (canvas.height / 2) - (paddleA.rigidBody.dimensions.y / 2);

        paddleB.rigidBody.position.x = canvas.width - (5 + paddleB.rigidBody.dimensions.x);
        paddleB.rigidBody.position.y = (canvas.height / 2) - (paddleB.rigidBody.dimensions.y / 2);

        state.addObject(paddleA);
        state.addObject(paddleB);
        state.addObject(puck);
        
        engine.run();
    }



}

