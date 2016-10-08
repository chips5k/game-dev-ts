import GameStateSimulator from '../core/GameStateSimulator';
import GameState from '../core/GameState';
import Puck from './Puck';
import Paddle from './Paddle';

export default class PongSimulator implements GameStateSimulator {
    delta: number = 0;
    elapsed: number = 0;

    constructor(public canvas: any) {}

    simulate(state: GameState, milliseconds: number) {
        this.delta = milliseconds;
        this.elapsed += this.delta;
        state.accept(this);
    }

    visit(o: any) {
        let i:any = o.constructor;
        switch(i.name) {
            case 'Puck':
                this.visitPuck(<Puck>o);
            break;

            case 'Paddle':
                this.visitPaddle(<Paddle>o);
            break;
        }

    }

    visitPuck(puck: Puck) {
       
    }

    visitPaddle(paddle: Paddle) {
        
    }
}