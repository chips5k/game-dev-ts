import GameState from '../core/GameState';
import GameStateObject from '../core/GameStateObject';
import Puck from './Puck';
import Paddle from './Paddle';

export default class PongRenderer {
    constructor(private ctx: any, private canvas: any) {}
    
    render(state: GameState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        state.accept(this);
    }

    visit(o: GameStateObject) { 
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
        this.ctx.fillRect(puck.rigidBody.position.x,puck.rigidBody.position.y, puck.rigidBody.dimensions.x, puck.rigidBody.dimensions.y);
    }
 
    visitPaddle(paddle: Paddle) {
         this.ctx.fillRect(paddle.rigidBody.position.x,paddle.rigidBody.position.y, paddle.rigidBody.dimensions.x, paddle.rigidBody.dimensions.y);
    }
} 