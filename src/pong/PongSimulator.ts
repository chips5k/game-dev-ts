import GameStateSimulator from '../core/GameStateSimulator';
import GameState from '../core/GameState';
import Puck from './Puck';
import Paddle from './Paddle';

export default class PongSimulator implements GameStateSimulator {
    delta: number = 0;
    elapsed: number = 0;
    state: GameState;

    constructor(public canvas: HTMLCanvasElement) {}

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

            if(o !== puck) {
               let b = (<Paddle>o).rigidBody;

               if(
                   (r.position.x + r.dimensions.x >= b.position.x && r.position.x + r.dimensions.x <= b.position.x + b.dimensions.x) ||
                   (r.position.x >= b.position.x && r.position.x <= b.position.x + b.dimensions.x)
               ) {

                    if(
                        (r.position.y + r.dimensions.y >= b.position.y && r.position.y + r.dimensions.y <= b.position.y + b.dimensions.y) ||
                        (r.position.y >= b.position.y && r.position.y <= b.position.y + b.dimensions.y)
                    ) {
                        
                        //Determine inset positions
                        let insetLeft = r.position.x - b.position.x;
                        if(insetLeft > 0) {
                            r.position.x = b.position.x + b.dimensions.x;
                        } else {
                            r.position.x = b.position.x - r.dimensions.x;
                        }

                        r.velocity.x = -r.velocity.x;


                        let center = r.position.y + (r.dimensions.y / 2);
                        let insetY = Math.round(center - b.position.y) / b.dimensions.y * 100;
                        
                        
                        if(insetY > 50) {
                            r.velocity.y = 0.05;
                        } else if(insetY < 50) {
                            r.velocity.y = -0.05;
                        } else {
                            r.velocity.y = 0;
                        }
                    }
                }
            }
        }


    }

    visitPaddle(paddle: Paddle) {
        let r = paddle.rigidBody;

        r.position.y += r.velocity.y * this.delta;

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
       
        if(r.acceleration.y > 0) {
            r.acceleration.y -= 0.0005;
            if(r.acceleration.y < 0) {
                r.acceleration.y = 0;
            }
        } else if(r.acceleration.y < 0) {
            r.acceleration.y += 0.0005;
            if(r.acceleration.y > 0) {
                r.acceleration.y = 0;
            }
        }
        

        r.velocity.y += r.acceleration.y * this.delta;

       
        if(r.velocity.y > 0) {
            r.velocity.y -= 0.0005;
            if(r.velocity.y < 0) {
                r.velocity.y = 0;
            }
        } else if(r.velocity.y < 0) {
            r.velocity.y += 0.0005;
            if(r.velocity.y > 0) {
                r.velocity.y = 0;
            }
        }
        
    }
}