import GameStateSimulator from '../core/GameStateSimulator';
import GameState from '../core/GameState';
import Puck from './Puck';
import Paddle from './Paddle';
import PlayerController from './PlayerController';
import AiController from './AiController';

export default class PongSimulator implements GameStateSimulator {
    delta: number = 0;
    elapsed: number = 0;
    state: GameState;

    constructor(public canvas: HTMLCanvasElement, public playerController: PlayerController, public aiController: AiController) {}

    simulate(state: GameState, milliseconds: number) {
        this.delta = milliseconds;
        this.elapsed += this.delta;
        this.state = state;
        this.state.accept(this);
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
        let r = puck.rigidBody;
        

        r.position.x += this.delta * r.velocity.x; 
        r.position.y += this.delta * r.velocity.y; 


        if(r.position.x < 0 ) {
            r.position.x = 0;
            r.velocity.x = -r.velocity.x;
        }

        if(r.position.y < 0 ) {
            r.position.y = 0;
            r.velocity.y = -r.velocity.y;
        }


        if(r.position.x + r.dimensions.x > this.canvas.width) {
            r.position.x = this.canvas.width - r.dimensions.x;
            r.velocity.x = -r.velocity.x;
        }

        if(r.position.y + r.dimensions.y > this.canvas.height) {
            r.position.y = this.canvas.height - r.dimensions.y;
            r.velocity.y = -r.velocity.y;
        }

        //Check paddle collisions
        for(let o of this.state.objects) {
            //only check if not puck object - e.g the paddles
            if(o !== puck) {
                //cast/set the paddle objects
               let b = (<Paddle>o).rigidBody;

               //if colliding on the x axis
               if(
                   (r.position.x + r.dimensions.x >= b.position.x && r.position.x + r.dimensions.x <= b.position.x + b.dimensions.x) ||
                   (r.position.x >= b.position.x && r.position.x <= b.position.x + b.dimensions.x)
               ) {

                   //if colliding on the y axis
                    if(
                        (r.position.y + r.dimensions.y >= b.position.y && r.position.y + r.dimensions.y <= b.position.y + b.dimensions.y) ||
                        (r.position.y >= b.position.y && r.position.y <= b.position.y + b.dimensions.y)
                    ) {
                        
                        //Determine inset positions - how far the puck penetrated the paddle
                        let insetX = r.position.x - b.position.x;

                        //If intersecting, adjust position to avoid travelling inside the obj.
                        if(insetX > 0) {
                            r.position.x = b.position.x + b.dimensions.x;
                        } else {
                            r.position.x = b.position.x - r.dimensions.x;
                        }

                        //reverse the velocity
                        r.velocity.x = -r.velocity.x;

                        //Determine position of y axis collisions
                        let center = r.position.y + (r.dimensions.y / 2);
                        //Normalize to a value in the range of -0.5 to 0.5 to force up down movement
                        let insetY = Math.round(center - b.position.y) / b.dimensions.y + -0.5;
                        
                        //Apply a y velocity based on inset position and the paddle;
                        r.velocity.y = 0.5 * insetY + b.velocity.y / 2;
                        
                    }
                }
            }
        }

         this.aiController.handlePuckChange(puck);

    }

    visitPaddle(paddle: Paddle) {
        let r = paddle.rigidBody;

        this.playerController.processInput();

        //Canvas collision check
        if(r.position.y < 0 ) {
            r.position.y = 0;
            r.velocity.y = 0;
        }

        //Canvas collision check
        if(r.position.y + r.dimensions.y > this.canvas.height) {
            r.position.y = this.canvas.height - r.dimensions.y;
            r.velocity.y = 0;
        }

        r.position.y += r.velocity.y * this.delta;
        
        r.velocity.y += r.acceleration.y;
        
       
        
        if(r.velocity.y > 0) {
            r.velocity.y += -0.0001 * this.delta;
            if(r.velocity.y < 0) { r.velocity.y = 0; }
        } else if(r.velocity.y < 0) {
            r.velocity.y += 0.0001 * this.delta;
            if(r.velocity.y > 0) { r.velocity.y = 0; }
        }

        if(r.velocity.y > 0.5) {
            r.velocity.y = 0.5;
        }

        if(r.velocity.y < -0.5) {
            r.velocity.y = -0.5;
        }

        r.acceleration.y = 0;
        
    }
}