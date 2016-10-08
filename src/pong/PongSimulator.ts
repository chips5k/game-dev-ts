import GameStateSimulator from '../core/GameStateSimulator';
import GameState from '../core/GameState';
import Puck from './Puck';
import Paddle from './Paddle';

export default class PongSimulator implements GameStateSimulator {
    delta: number = 0;
    elapsed: number = 0;

    constructor(public canvas: HTMLCanvasElement) {}

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
        let r = paddle.rigidBody;

        if(r.velocity.y == 0) {
            r.position.y += this.delta * r.acceleration.y; 
        } else {
            r.position.y += r.velocity.y * this.delta * r.acceleration.y; 
        }
        

        if(r.position.y < 0 ) {
            r.position.y = 0;
            r.velocity.y = 0;
            r.acceleration.y = 0;
        }

        if(r.position.y + r.dimensions.y > this.canvas.height) {
            r.position.y = this.canvas.height - r.dimensions.y;
            r.velocity.y = 0;
            r.acceleration.y = 0;
        }
    }
}