import GameState from '../core/GameState';
import GameStateObject from '../core/GameStateObject';
import Puck from './Puck';

export default class PongRenderer {
    constructor(private ctx: any, private canvas: any) {}
    
    render(state: GameState) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        state.accept(this);
    }

    visit(o: GameStateObject) {

        switch(typeof(o)) {
            case 'Puck':
                this.visitPuck(<Puck>o);
            break;
        }

    }

    visitPuck(puck: Puck) {
        this.ctx.fillRect(puck.x,puck.y, puck.w, puck.h);
    }
}